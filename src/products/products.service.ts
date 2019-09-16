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
		return await this.productRepository.delete(id);
	}
}
