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
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const input = {
                name,
                email,
                password,
            };
            try {
                const token = yield this.userBusiness.signup(input);
                res
                    .status(201)
                    .send({ message: "Usuário cadastrado com sucesso", token });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro no signup");
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const input = {
                email,
                password,
            };
            try {
                const token = yield this.userBusiness.login(input);
                res.status(200).send({ message: "Usuário logado com sucesso", token });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro no login");
            }
        });
        this.follow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { followed_id } = req.body;
            try {
                yield this.userBusiness.follow(followed_id, token);
                res.status(200).send({ message: "Usuário seguido com sucesso" });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao seguir usuário");
            }
        });
        this.unfollow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { followed_id } = req.body;
            try {
                yield this.userBusiness.unfollow(followed_id, token);
                res
                    .status(200)
                    .send({ message: "Usuário deixou de ser seguido com sucesso" });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send("Erro ao deixar de seguir usuário");
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map