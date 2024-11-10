import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListingService {
  constructor(@InjectRepository(Listing) private listingRepository: Repository<Listing>){}

  create(createListingDto: CreateListingDto) {
    return this.listingRepository.save(createListingDto)
  }

  findAll() {
    return this.listingRepository.find();
  }

  findOne(id: number) {
    return this.listingRepository.findOneBy({listing_id:id});
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return this.listingRepository.update({listing_id:id},updateListingDto)
  }

  remove(id: number) {
    return this.listingRepository.delete({listing_id:id})
  }
}
