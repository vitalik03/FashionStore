import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';
import {productNotFound, ownerNotFound} from '../constants/product-responses'

@Injectable()
export class ProductsService {
    constructor(
		@Inject('PRODUCT_REPOSITORY')
		private readonly productRepository: Repository<IProduct>,
    ){}

    async create(product: IProduct): Promise<IProduct>{
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

  async getProductByName(name: string): Promise<IProduct>{
    const product = await this.productRepository.findOne({ where: {'name': name}});
    if (!product) {
      throw new HttpException(productNotFound, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async delete(id: number, userId: number){
    const checkProductByOwner = await this.productRepository.findOne({ where: { "user": userId }, relations:['user']});
    if(!checkProductByOwner){
      throw new HttpException(ownerNotFound, HttpStatus.NOT_FOUND);
    }
    const product = await this.productRepository.findOne(id, {relations:['user']})
    if (JSON.stringify(checkProductByOwner.user) !== JSON.stringify(product.user)) {
      throw new HttpException(ownerNotFound, HttpStatus.NOT_FOUND);
    }
		return await this.productRepository.delete(id);
  }
  
  async update(id: number, product: IProduct, userId: number): Promise<IProduct>{
    const checkProductByOwner = await this.productRepository.findOne({ where: { "user": userId }, relations:['user']});
    const products = await this.productRepository.findOne(id, {relations:['user']})
    if(!checkProductByOwner){
      throw new HttpException(ownerNotFound, HttpStatus.NOT_FOUND);
    }
    if (JSON.stringify(checkProductByOwner.user) !== JSON.stringify(products.user)) {
      throw new HttpException(ownerNotFound, HttpStatus.NOT_FOUND);
    }
		return await this.productRepository.save({ ...product, id: Number(id) });
  }
}
