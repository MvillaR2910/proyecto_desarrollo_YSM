import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ListingModule } from './listing/listing.module';
import { PhotoModule } from './photo/photo.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
import { MessageModule } from './message/message.module';
import 'dotenv/config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BD_HOST,
      port: Number(process.env.BD_PORT),
      username: process.env.BD_USER,
      password: process.env.BD_PASSWORD,
      database: process.env.BD_DATABASE,
      synchronize: true,
      autoLoadEntities:true
    }),
    UserModule,
    ListingModule,
    PhotoModule,
    BookingModule,
    ReviewModule,
    MessageModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
