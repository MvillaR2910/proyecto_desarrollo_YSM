export class CreateMessageDto {
    message_id: number
    sender_user_id: number
    receiver_user_id: number
    listing_id: number
    message: string
    created_at: Date
}
