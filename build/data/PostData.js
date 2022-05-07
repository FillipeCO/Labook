"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatabase_1 = require("./BaseDatabase");
class PostData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "Labook_posts";
        this.FOLLOWERS_TABLE_NAME = "Labook_followers";
        this.POST_LIKES_TABLE_NAME = "Labook_posts_likes";
        this.COMMENTS_TABLE_NAME = "Labook_posts_comments";
        this.insert = (post) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.TABLE_NAME).insert(post);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Erro do banco !");
                }
            }
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this.connection(this.TABLE_NAME)
                    .select()
                    .where({ id });
                return queryResult[0];
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Erro do banco !");
                }
            }
        });
        this.getFeed = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResultFollowers = yield this.connection(this.FOLLOWERS_TABLE_NAME)
                    .select()
                    .where({ follower_id: id });
                const followedUsersIds = queryResultFollowers.map((follower) => follower.followed_id);
                const queryResultPosts = yield this.connection(this.TABLE_NAME)
                    .select()
                    .where({ user_id: followedUsersIds })
                    .orderBy("created_at", "desc");
                return queryResultPosts;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Erro do banco !");
                }
            }
        });
        this.getFeedByType = (id, type) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResultFollowers = yield this.connection(this.FOLLOWERS_TABLE_NAME)
                    .select()
                    .where({ follower_id: id });
                const followedUsersIds = queryResultFollowers.map((follower) => follower.followed_id);
                const queryResultPosts = yield this.connection(this.TABLE_NAME)
                    .select()
                    .where({ user_id: followedUsersIds, post_type: type })
                    .orderBy("created_at", "desc");
                return queryResultPosts;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("Erro do banco !");
            }
        });
        this.getFeedByPage = (id, page) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResultFollowers = yield this.connection(this.FOLLOWERS_TABLE_NAME)
                    .select()
                    .where({ follower_id: id });
                const followedUsersIds = queryResultFollowers.map((follower) => follower.followed_id);
                const queryResultPosts = yield this.connection(this.TABLE_NAME)
                    .select()
                    .where({ user_id: followedUsersIds })
                    .orderBy("created_at", "desc")
                    .limit(5)
                    .offset((page - 1) * 5);
                return queryResultPosts;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("Erro do banco !");
            }
        });
        this.likePost = (postId, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.POST_LIKES_TABLE_NAME).insert({
                    id: postId,
                    user_id: userId,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("Erro do banco !");
            }
        });
        this.isAlreadyLiked = (postId, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this.connection(this.POST_LIKES_TABLE_NAME)
                    .select()
                    .where({ id: postId, user_id: userId });
                return queryResult.length > 0;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("Erro do banco !");
            }
        });
        this.unlikePost = (postId, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.POST_LIKES_TABLE_NAME)
                    .where({ id: postId, user_id: userId })
                    .del();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("Erro do banco !");
            }
        });
        this.commentPost = (commentId, userId, comment, created_at, postId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection(this.COMMENTS_TABLE_NAME).insert({
                    id: commentId,
                    user_id: userId,
                    comment,
                    created_at,
                    post_id: postId,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("Erro do banco !");
            }
        });
    }
}
exports.default = PostData;
//# sourceMappingURL=PostData.js.map