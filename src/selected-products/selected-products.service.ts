import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ISelectedProduct } from './interfaces/selected-product.interface';
import { CreateSelectedProductDto } from './dto/create-sp.dto';

@Injectable()
export class SelectedProductsService {
    constructor(
		@Inject('SELECTEDPRODUCTS_REPOSITORY')
        private readonly selectedProductRepository: Repository<ISelectedProduct>,
    ){}

    async create(selectedProduct: CreateSelectedProductDto){
        return await this.selectedProductRepository.save(selectedProduct);
    }
}
