import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>){}

  create(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.save(createReviewDto)
  }

  findAll() {
    return this.reviewRepository.find();
  }

  findOne(id: number) {
    return this.reviewRepository.findOneBy({review_id:id});
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.update({review_id:id},updateReviewDto)
  }

  remove(id: number) {
    return this.reviewRepository.delete({review_id:id})
  }
}
