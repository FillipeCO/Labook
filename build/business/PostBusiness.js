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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../model/Post"));
class PostBusiness {
    constructor(postData, idGenerator, authenticator) {
        this.postData = postData;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
        this.createPost = (input, token) => __awaiter(this, void 0, void 0, function* () {
            const { title, body, image_url, post_type } = input;
            if (!title || !body) {
                throw new Error("Campos inválidos");
            }
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const currentTime = new Date();
            const id = this.idGenerator.generateId();
            const post = new Post_1.default(id, title, body, post_type, image_url, currentTime, user.id);
            yield this.postData.insert(post);
            return post;
        });
        this.getPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postData.findById(id);
            if (!post) {
                throw new Error("Post não encontrado");
            }
            return post;
        });
        this.getFeed = (token) => __awaiter(this, void 0, void 0, function* () {
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const feed = yield this.postData.getFeed(user.id);
            return feed;
        });
        this.getFeedByType = (token, type) => __awaiter(this, void 0, void 0, function* () {
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const feed = yield this.postData.getFeedByType(user.id, type);
            return feed;
        });
        this.getFeedByPage = (token, page) => __awaiter(this, void 0, void 0, function* () {
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const feed = yield this.postData.getFeedByPage(user.id, page);
            return feed;
        });
        this.likePost = (token, id) => __awaiter(this, void 0, void 0, function* () {
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const isLiked = yield this.postData.isAlreadyLiked(id, user.id);
            if (isLiked) {
                throw new Error("Post já curtido");
            }
            const post = yield this.getPostById(id);
            if (!post) {
                throw new Error("Post não encontrado");
            }
            yield this.postData.likePost(post.id, user.id);
            return post;
        });
        this.unlikePost = (token, id) => __awaiter(this, void 0, void 0, function* () {
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const postId = yield this.postData.findById(id);
            if (!postId) {
                throw new Error("Post não encontrado");
            }
            const isLiked = yield this.postData.isAlreadyLiked(id, user.id);
            if (!isLiked) {
                throw new Error("Não pode descurtir um post que não foi curtido");
            }
            yield this.postData.unlikePost(postId.id, user.id);
            return postId;
        });
        this.commentPost = (token, id, comment) => __awaiter(this, void 0, void 0, function* () {
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const post = yield this.getPostById(id);
            if (!post) {
                throw new Error("Post não encontrado");
            }
            const currentTime = new Date();
            const commentId = this.idGenerator.generateId();
            yield this.postData.commentPost(post.id, commentId, comment, currentTime, user.id);
            return post;
        });
    }
}
exports.default = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map