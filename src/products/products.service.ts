import { Injectable, Inject } from '@nestjs/common';
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
}
