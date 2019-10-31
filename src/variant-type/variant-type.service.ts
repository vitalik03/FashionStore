import { Injectable, Inject } from '@nestjs/common';
import { IVariantType } from './interfaces/variantType.interface';
import { Repository } from 'typeorm';

@Injectable()
export class VariantTypeService {
    constructor(
		@Inject('VARIANTTYPE_REPOSITORY')
		private readonly variantTypeRepository: Repository<IVariantType>,
    ){}

    async create(variantType: IVariantType): Promise<IVariantType>{
      return await this.variantTypeRepository.save(variantType);
    }
}
