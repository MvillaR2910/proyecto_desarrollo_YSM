import { Listing } from "src/listing/entities/listing.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    message_id: number

    @ManyToOne(()=>User, sender=>sender.send_messages)
    @JoinColumn({name:"sender_user_id",referencedColumnName:"user_id"})
    sender: User
    @Column()
    sender_user_id: number

    @ManyToOne(()=>User, receiver=>receiver.receive_messages)
    @JoinColumn({name:"receiver_user_id",referencedColumnName:"user_id"})
    receiver: User
    @Column()
    receiver_user_id: number

    @ManyToOne(()=>Listing, listing=>listing.messages)
    @JoinColumn({name:"listing_id",referencedColumnName:"listing_id"})
    listing: Listing
    @Column()
    listing_id: number

    @Column()
    message: string
    @Column({default: new Date()})
    created_at: Date

}
