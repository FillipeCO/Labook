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
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const post = {
                    title: req.body.title,
                    body: req.body.body,
                    image_url: req.body.image_url,
                    post_type: req.body.post_type,
                };
                yield this.postBusiness.createPost(post, token);
                res.status(200).send({
                    message: "Post criado com sucesso",
                    post,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro no criação de post");
            }
        });
        this.getPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postBusiness.getPostById(req.params.id);
                res.status(200).send({
                    message: "Post encontrado com sucesso",
                    post,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao encontrar post");
            }
        });
        this.getFeed = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const page = req.params.page;
                const feed = yield this.postBusiness.getFeed(token, parseInt(page));
                res.status(200).send({
                    message: "Feed encontrado com sucesso",
                    feed,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao encontrar feed");
            }
        });
        this.getFeedByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const page = req.params.page;
                const type = req.params.type;
                const feed = yield this.postBusiness.getFeedByType(token, parseInt(page), type);
                res.status(200).send({
                    message: "Feed encontrado com sucesso",
                    feed,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao encontrar feed");
            }
        });
        this.likePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                yield this.postBusiness.likePost(token, req.params.id);
                res.status(200).send({
                    message: "Post curtido com sucesso",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao curtir post");
            }
        });
        this.unlikePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                yield this.postBusiness.unlikePost(token, req.params.id);
                res.status(200).send({
                    message: "Post descurtido com sucesso",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao descutir o post");
            }
        });
        this.commentPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const comment = {
                    comment: req.body.comment,
                };
                yield this.postBusiness.commentPost(token, req.params.id, comment);
                res.status(200).send({
                    message: "Comentário adicionado com sucesso",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao adicionar comentário");
            }
        });
    }
}
exports.default = PostController;
//# sourceMappingURL=PostController.js.map