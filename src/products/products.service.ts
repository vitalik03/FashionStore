import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';
import {productNotFound} from '../constants/product-responses'

@Injectable()
export class ProductsService {
    constructor(
		@Inject('PRODUCT_REPOSITORY')
		private readonly productRepository: Repository<IProduct>,
    ){}

    async create(product: IProduct): Promise<IProduct>{
      const time = new Date();
      product.createdAt = time;
      product.updatedAt = time;
      return await this.productRepository.save(product);
    }

    async getProducts(){
      return await this.productRepository.find();
  }

  async getProduct(id: string): Promise<IProduct> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new HttpException(productNotFound, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async delete(id: number, userId: number){
    const checkProductByOwner = await this.productRepository.findOne({ where: { "user": userId }, relations:['user']});
    const product = await this.productRepository.findOne(id, {relations:['user']})
    
    if (JSON.stringify(checkProductByOwner.user) !== JSON.stringify(product.user)) {
      throw new HttpException(productNotFound, HttpStatus.NOT_FOUND);
    }
		return await this.productRepository.delete(id);
  }
  
  async update(id: string, product: IProduct): Promise<IProduct>{
    const testproduct = await this.productRepository.findOne(id);
    if (!testproduct) {
      throw new HttpException(productNotFound, HttpStatus.NOT_FOUND);
    }
    const time = new Date();
    product.updatedAt = time;
		return await this.productRepository.save({ ...product, id: Number(id) });
  }
}
