import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IImage } from './interfaces/images.interface';

@Injectable()
export class ImagesService {
    constructor(
		@Inject('IMAGE_REPOSITORY')
		private readonly imageRepository: Repository<IImage>,
    ){}

    async create(image: IImage): Promise<IImage>{
      return await this.imageRepository.save(image);
    }

    async getAll(){
      return await this.imageRepository.find();
    }
}
