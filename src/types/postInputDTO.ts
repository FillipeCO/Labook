import { POST_TYPE } from "../model/Post"

export type PostInputDTO = {
    title: string
    body: string
    image_url: string
    post_type: POST_TYPE
}