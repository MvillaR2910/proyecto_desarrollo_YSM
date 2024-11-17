import { Booking } from "src/booking/entities/booking.entity";
import { Listing } from "src/listing/entities/listing.entity";
import { Message } from "src/message/entities/message.entity";
import { Review } from "src/review/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number
    @Column()
    username: string
    @Column({unique:true})
    email: string
    @Column()
    password: string
    @Column({nullable:true})
    profile_picture: string
    @Column({nullable:true})
    bio: string
    @Column({default:false})
    is_owner: boolean
    @Column({default: new Date()})
    created_at: Date
    @Column({default: new Date()})
    updated_at: Date

    @OneToMany(()=>Listing, (listing)=>listing.user)
    listings: Listing[]
    @OneToMany(()=>Booking, (booking)=>booking.user)
    bookings: Booking[]
    @OneToMany(()=>Review, (review)=>review.user)
    reviews: Review[]
    @OneToMany(()=>Message, (message)=>message.sender)
    send_messages: Review[]
    @OneToMany(()=>Message, (message)=>message.receiver)
    receive_messages: Review[]
}
