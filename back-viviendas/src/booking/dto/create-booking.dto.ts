export class CreateBookingDto {
    booking_id: number
    listing_id: number
    user_id: string
    start_date: Date
    end_date: Date
    total_price: number
    created_at: Date
}
