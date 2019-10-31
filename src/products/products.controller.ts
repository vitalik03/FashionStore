import { Controller, Post, Body, UseInterceptors, UploadedFile, Param, Get, Delete, Put, Res, HttpException, UploadedFiles, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './interfaces/product.interface';
import { CreateProductDto, CreateBody, CreateVariants, UpdateBody } from './dto/create-product.dto';
import { ImagesService } from '../images/images.service';
import { VariantTypeService } from '../variant-type/variant-type.service';
import { VariantValueService } from '../variant-value/variant-value.service';
import { VariantsService } from '../variants/variants.service';
import { CreateVariantTypeDto } from '../variant-type/dto/create-variantType.dto';
import { CreateVariantValueDto } from '../variant-value/dto/create-variantValue.dto';
import { CreateVariantsDto } from '../variants/dto/create-variant.dto';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IImage } from 'src/images/interfaces/images.interface';
import { Product } from './products.entity';
import {succesfulDeleting, imageError, succesfulDeletingImage} from '../constants/product-responses'
import { IVariantType } from 'src/variant-type/interfaces/variantType.interface';
import { ApiImplicitFile, ApiConsumes, ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService,
                private readonly imageService: ImagesService,
                private readonly variantTypeService: VariantTypeService,
                private readonly variantValueService: VariantValueService,
                private readonly variantsService: VariantsService           
    ){}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiResponse({ status: 201, description: 'Product was succcessfully created'})
    @ApiResponse({ status: 403, description: 'Product is in the database!'})
    async createProduct(@Body() body: CreateBody,
                        ){
      const {name, brandName, basicPrice, description, cloth, user, quantity, typeName, valueName} = body;
      const time = new Date();
      let createdAt = time;
      let updatedAt = time;
      const createProduct:IProduct = {name, brandName, basicPrice, description, cloth, user, quantity, createdAt, updatedAt};
      const createvariantType: IVariantType = {typeName};
      const product = await this.productsService.create(createProduct);
      const variantType = await this.variantTypeService.create(createvariantType);
      const variantValue = await this.variantValueService.create({valueName, variantType: variantType.id});
      await this.variantsService.create({product: product.id, variantValue: variantValue.id});

      const resultObj = {product, variantType, variantValue};
      return resultObj;
      
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/variants/:productId')
    async createVariants(@Param('productId') productId: number ,@Body() body: CreateVariants){
      const {typeName, valueName} = body;
      const createvariantType: IVariantType = {typeName};
      const variantType = await this.variantTypeService.create(createvariantType);
      const variantValue = await this.variantValueService.create({valueName, variantType: variantType.id});
      await this.variantsService.create({product: productId, variantValue: variantValue.id});

      return {variantType, variantValue};
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('images/:productId')
    @UseInterceptors(
     FilesInterceptor('image',6,{
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const fileName = file.originalname.replace(/ +?/g, '_');
          callback(null, `${fileName}`);
        }
      }),
      fileFilter: (req, file, callback) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
          return callback(new Error('Only image file are allowed'),false);
        }
        callback(null,true);
      }
     })
    )
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'image', required: true })
    async uploadFile(@Param('productId') productId: number ,@UploadedFiles() files){
      let file;
      files.forEach(async element => {
        const image = {
        imageURL: element.filename,
        producti: productId
      };
      await this.imageService.create(image);
      });
      const message = "Images was successfully added";
      return message;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('images/:imgpath')
    seeUploadedFile(@Param('imgpath') image: string, @Res() res){
      return res.sendFile(image, { root: './files'});
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('images')
    getImages(): Promise<IImage[]>{
      return this.imageService.getAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete('/image/:imageId')
    async deleteimage(@Param('imageid') id: number){
        await this.imageService.delete(id);
        return succesfulDeletingImage;

    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of Products ```[new Product()]```' })
    getProducts(): Promise<IProduct[]> {
      return this.productsService.getProducts();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Product Object ```new Product()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
   async getOne(@Param('id') id: string): Promise<IProduct> {
      return this.productsService.getProduct(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id/:userId')
   async delete(@Param('id') id: number, @Param('userId') userId : number){
    await this.productsService.delete(id, userId);
    const message = succesfulDeleting;
    return message;
  }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put(':productId/:userId')
	  async update(@Param('productId') id: number, @Body() updateProduct: UpdateBody, @Param('userId') userId: number){
      const {name, brandName, basicPrice, description, cloth, quantity, typeName, valueName} = updateProduct;
      const time = new Date();
      let updatedAt = time;
      const user = userId;
      const createProduct:IProduct = {name, brandName, basicPrice, description, user ,cloth, quantity, updatedAt};
      const createvariantType: IVariantType = {typeName};
      const product = await this.productsService.update(id, createProduct,userId);
      const variant = await this.variantsService.findOne(product.id);
      await this.variantsService.delete(variant.id);
      const variantType = await this.variantTypeService.create(createvariantType);
      const variantValue = await this.variantValueService.create({valueName, variantType: variantType.id});
      await this.variantsService.create({product: id, variantValue: variantValue.id});

      return {product,variantType,variantValue};
	}
}
