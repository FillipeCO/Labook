"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST_TYPE = void 0;
var POST_TYPE;
(function (POST_TYPE) {
    POST_TYPE["NORMAL"] = "NORMAL";
    POST_TYPE["EVENT"] = "EVENT";
})(POST_TYPE = exports.POST_TYPE || (exports.POST_TYPE = {}));
class Post {
    constructor(id, title, body, post_type, image_url, created_at, user_id) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.post_type = post_type;
        this.image_url = image_url;
        this.created_at = created_at;
        this.user_id = user_id;
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map