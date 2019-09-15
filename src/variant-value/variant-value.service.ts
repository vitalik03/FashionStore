import { Injectable, Inject } from '@nestjs/common';
import { IVariantValue } from './interfaces/variantValue.interface';
import { Repository } from 'typeorm';

@Injectable()
export class VariantValueService {
    constructor(
		@Inject('VARIANTVALUE_REPOSITORY')
		private readonly productRepository: Repository<IVariantValue>,
    ){}
}
