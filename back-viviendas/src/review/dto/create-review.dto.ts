export class CreateReviewDto {
    review_id: number
    listing_id: number
    user_id: number
    rating: number
    comment: string
    created_at: Date

}
