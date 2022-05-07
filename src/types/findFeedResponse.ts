import { POST_TYPE } from "../model/Post"

export type Feed = {
    id: string
    title: string
    body: string
    image_url: string
    post_type: POST_TYPE
    created_at: string
    user_id: string
}