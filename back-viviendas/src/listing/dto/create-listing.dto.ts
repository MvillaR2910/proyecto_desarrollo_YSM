export class CreateListingDto {
    user_id: number
    listing_id: number
    title: string
    description: string
    address: string
    latitude: number
    longitude: number
    price_per_night: number
    num_bedrooms: number
    num_bathrooms: number
    max_guests: number
    created_at: Date
    updated_at: Date
}
