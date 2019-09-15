import { Injectable, Inject } from '@nestjs/common';
import { IVariantType } from './interfaces/variantType.interface';
import { Repository } from 'typeorm';

@Injectable()
export class VariantTypeService {
    constructor(
		@Inject('VARIANTTYPE_REPOSITORY')
		private readonly productRepository: Repository<IVariantType>,
    ){}
}
