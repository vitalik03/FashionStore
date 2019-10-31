import { Injectable, Inject } from '@nestjs/common';
import { IVariantValue } from './interfaces/variantValue.interface';
import { Repository } from 'typeorm';

@Injectable()
export class VariantValueService {
    constructor(
		@Inject('VARIANTVALUE_REPOSITORY')
		private readonly variantValueRepository: Repository<IVariantValue>,
    ){}

    async create(variantValue: IVariantValue): Promise<IVariantValue>{
      return await this.variantValueRepository.save(variantValue);
    }
}
