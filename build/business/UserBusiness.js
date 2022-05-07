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
const User_1 = __importDefault(require("../model/User"));
class UserBusiness {
    constructor(userData, idGenerator, hashManager, authenticator) {
        this.userData = userData;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            if (!email || !name || !password) {
                throw new Error("Campos inválidos");
            }
            const registeredUser = yield this.userData.findByEmail(email);
            if (registeredUser) {
                throw new Error("Email já cadastrado");
            }
            const id = this.idGenerator.generateId();
            const hashedPassword = yield this.hashManager.hash(password);
            const user = new User_1.default(id, name, email, hashedPassword);
            yield this.userData.insert(user);
            const token = this.authenticator.generateToken({ id });
            return token;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            if (!email || !password) {
                throw new Error("Campos inválidos");
            }
            const user = yield this.userData.findByEmail(email);
            if (!user) {
                throw new Error("Usuário não cadastrado");
            }
            const isPasswordCorrect = yield this.hashManager.compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new Error("Senha incorreta");
            }
            const token = this.authenticator.generateToken({ id: user.id });
            return token;
        });
        this.follow = (followed_id, token) => __awaiter(this, void 0, void 0, function* () {
            if (!followed_id) {
                throw new Error("Campos inválidos");
            }
            if (!token) {
                throw new Error("Token inválido");
            }
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const follower = yield this.userData.findById(followed_id);
            if (!follower) {
                throw new Error("Usuário não cadastrado");
            }
            const isFollowing = yield this.userData.isAlreadyFollowed(followed_id, user.id);
            if (isFollowing) {
                throw new Error("Usuário já seguido");
            }
            yield this.userData.follow(followed_id, user.id);
            return "Seguindo";
        });
        this.unfollow = (followed_id, token) => __awaiter(this, void 0, void 0, function* () {
            if (!followed_id) {
                throw new Error("Campos inválidos");
            }
            if (!token) {
                throw new Error("Token inválido");
            }
            const user = this.authenticator.getTokenData(token);
            if (!user) {
                throw new Error("Usuário não autenticado");
            }
            const follower = yield this.userData.findById(followed_id);
            if (!follower) {
                throw new Error("Usuário não cadastrado");
            }
            const isFollowing = yield this.userData.isAlreadyFollowed(followed_id, user.id);
            if (!isFollowing) {
                throw new Error("O usuário não segue o outro");
            }
            yield this.userData.unfollow(followed_id, user.id);
            return "Deixou de seguir";
        });
    }
}
exports.default = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map