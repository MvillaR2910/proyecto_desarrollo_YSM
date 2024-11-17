import { Booking } from "src/booking/entities/booking.entity";
import { Message } from "src/message/entities/message.entity";
import { Photo } from "src/photo/entities/photo.entity";
import { Review } from "src/review/entities/review.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listing {
    @PrimaryGeneratedColumn()
    listing_id: number

    @ManyToOne(() => User, (user) => user.listings)
    @JoinColumn({name:"user_id",referencedColumnName:"user_id"})
    user: User
    @Column()
    user_id: number

    @Column()
    title: string
    @Column()
    description: string
    @Column()
    address: string
    @Column('float')
    latitude: number
    @Column('float')
    longitude: number
    @Column()
    price_per_night: number
    @Column()
    num_bedrooms: number
    @Column()
    num_bathrooms: number
    @Column()
    max_guests: number
    @Column({ default: new Date() })
    created_at: Date
    @Column({ default: new Date() })
    updated_at: Date

    @OneToMany(()=>Review, (review)=>review.listing)
    reviews: Review[]
    @OneToMany(()=>Photo, (photo)=>photo.listing)
    photos:Photo[]
    @OneToMany(()=>Booking, booking=>booking.listing)
    bookings:Booking[]
    @OneToMany(()=>Message, message=>message.listing)
    messages:Message[]
}
