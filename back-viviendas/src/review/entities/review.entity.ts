import { Listing } from "src/listing/entities/listing.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    review_id: number
    
    @ManyToOne(()=>Listing, listing=>listing.reviews)
    @JoinColumn({name:"listing_id",referencedColumnName:"listing_id"})
    listing: Listing
    @Column()
    listing_id: number

    @ManyToOne(()=>User, user=>user.reviews)
    @JoinColumn({name:"user_id",referencedColumnName:"user_id"})
    user: Listing
    @Column()
    user_id: number

    @Column()
    rating: number
    @Column()
    comment: string
    @Column({default: new Date()})
    created_at: Date 

}
