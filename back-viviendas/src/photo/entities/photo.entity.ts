import { Listing } from "src/listing/entities/listing.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    photo_id: number
    @ManyToOne(()=>Listing, (listing)=>listing.photos)
    @JoinColumn({name:"listing_id",referencedColumnName:"listing_id"})
    listing:Listing
    @Column()
    listing_id: number
    @Column()
    photo_url: string
    @Column({ default: new Date() })
    created_at: Date

}