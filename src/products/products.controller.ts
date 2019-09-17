import { Controller, Post, Body, UseInterceptors, UploadedFile, Param, Get, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ImagesService } from 'src/images/images.service';
import { VariantTypeService } from 'src/variant-type/variant-type.service';
import { VariantValueService } from 'src/variant-value/variant-value.service';
import { VariantsService } from 'src/variants/variants.service';
import { CreateVariantTypeDto } from 'src/variant-type/dto/create-variantType.dto';
import { CreateVariantValueDto } from 'src/variant-value/dto/create-variantValue.dto';
import { CreateVariantsDto } from 'src/variants/dto/create-variant.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService,
                private readonly imageService: ImagesService,
                private readonly variantTypeService: VariantTypeService,
                private readonly variantValueService: VariantValueService,
                private readonly variantsService: VariantsService           
    ){}

    @Post()
    async createProduct(@Body() createProduct: CreateProductDto,
                        @Body() createVariantType: CreateVariantTypeDto,
                        @Body() createVariantValue: CreateVariantValueDto,
                        @Body() createVariants: CreateVariantsDto
                        ){
        await this.productsService.create(createProduct);
        await this.variantTypeService.create(createVariantType);
        await this.variantValueService.create(createVariantValue);
        await this.variantsService.create(createVariants);
    }

    @Post('/variants')
    async createVariants(@Body() createVariantType: CreateVariantTypeDto,
                        @Body() createVariantValue: CreateVariantValueDto,
                        @Body() createVariants: CreateVariantsDto
                        ){
        await this.variantTypeService.create(createVariantType);
        await this.variantValueService.create(createVariantValue);
        await this.variantsService.create(createVariants);
    }

    @Post(':productId')
    @UseInterceptors(
     FileInterceptor('image',{
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
    async uploadFile(@Param('productId') productId: number ,@UploadedFile() file){
      const image = {
        imageURL: file.filename,
        producti: productId
      };
      await this.imageService.create(image)
    }

    @Get()
    getProducts(): Promise<IProduct[]> {
      return this.productsService.getProducts();
    }

    @Get(':id')
    getOne(@Param('id') id): Promise<IProduct> {
        return this.productsService.getProduct(id);
    }

    @Delete(':id')
	async delete(@Param('id') id:string){
		return await this.productsService.delete(id);
    }
    
    @Put(':id')
	async update(@Param('id') id: string, @Body() updateProduct: CreateProductDto){
		return await this.productsService.update(id, updateProduct);
	}
}
