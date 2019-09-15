import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IVariants } from './interfaces/variants.interface';

@Injectable()
export class VariantsService {
    constructor(
		@Inject('VARIANTS_REPOSITORY')
		private readonly productRepository: Repository<IVariants>,
    ){}
}
