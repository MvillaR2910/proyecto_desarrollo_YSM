import { Listing } from "src/listing/entities/listing.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id: number

    @ManyToOne(()=>Listing, listing=>listing.bookings)
    @JoinColumn({name:"listing_id",referencedColumnName:"listing_id"})
    listing:Listing
    @Column()
    listing_id: number

    @ManyToOne(()=>User, user=>user.bookings)
    @JoinColumn({name:"user_id",referencedColumnName:"user_id"})
    user: User
    @Column()
    user_id: string

    @Column()
    start_date: Date
    @Column()
    end_date: Date
    @Column()
    total_price: number
    @Column({ default: new Date() })
    created_at: Date
}
