import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ISelectedProduct } from './interfaces/selected-product.interface';

@Injectable()
export class SelectedProductsService {
    constructor(
		@Inject('SELECTEDPRODUCTS_REPOSITORY')
        private readonly selectedProductRepository: Repository<ISelectedProduct>,
    ){}
}
