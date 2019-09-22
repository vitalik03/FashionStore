import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IVariants } from './interfaces/variants.interface';

@Injectable()
export class VariantsService {
    constructor(
		@Inject('VARIANTS_REPOSITORY')
		private readonly variantsRepository: Repository<IVariants>,
    ){}

    async create(variants: IVariants): Promise<IVariants>{
      return await this.variantsRepository.save(variants);
    }
    async findOne(productId: number): Promise<IVariants>{
      return await this.variantsRepository.findOne({ where: [{ "product": productId }]})
    }
    async delete(id: number){
      return await this.variantsRepository.delete(id);
    }
}
