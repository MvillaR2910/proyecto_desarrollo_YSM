import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotoService {

  constructor(@InjectRepository(Photo) private photoRepository: Repository<Photo>){}

  create(createPhotoDto: CreatePhotoDto) {
    return this.photoRepository.save(createPhotoDto)
  }

  findAll() {
    return this.photoRepository.find();
  }

  findOne(id: number) {
    return this.photoRepository.findOneBy({photo_id:id});
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return this.photoRepository.update({photo_id:id},updatePhotoDto)
  }

  remove(id: number) {
    return this.photoRepository.delete({photo_id:id})
  }
}
