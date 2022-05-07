export enum POST_TYPE {
    NORMAL = 'NORMAL',
    EVENT = 'EVENT',
}

export default class Post{
    constructor(
        private id:string,
        private title:string,
        private body:string,
        private post_type:POST_TYPE,
        private image_url:string,
        private created_at:Date,
        private user_id:string
    ){}
}