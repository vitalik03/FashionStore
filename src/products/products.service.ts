import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IProduct } from './interfaces/product.interface';
import { Repository } from 'typeorm';

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

  async getProduct(id: number): Promise<IProduct> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async delete(id: string){
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
		return await this.productRepository.delete(id);
  }
  
  async update(id: string, product: IProduct): Promise<IProduct>{
    const testproduct = await this.productRepository.findOne(id);
    if (!testproduct) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const time = new Date();
    product.updatedAt = time;
		return await this.productRepository.save({ ...product, id: Number(id) });
	}
}
