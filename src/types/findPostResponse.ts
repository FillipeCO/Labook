import { POST_TYPE } from "../model/Post"

export type FindPostResponse = {
    id: string
    title: string,
    body: string,
    post_type: POST_TYPE,
    image_url: string,
    created_at: Date,
    user_id: string
}[]
