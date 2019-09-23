import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IImage } from './interfaces/images.interface';
import { imageNotfound } from 'src/constants/image-responses';

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
      return await this.imageRepository.find({relations: ['producti']});
    }

    async delete(id: number): Promise<IImage> {
      const findImage = await this.imageRepository.findOne(id);
      if (!findImage) {
          throw new HttpException(imageNotfound, HttpStatus.NOT_FOUND);
      }
      return await this.imageRepository.remove(findImage);
  }
}
