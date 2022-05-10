import UserData from "../data/UserData";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { SignupInputDTO } from "../types/signupInputDTO";
import { LoginInputDTO } from "../types/loginInputDTO";

export default class UserBusiness {
  constructor(
    private userData: UserData,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  signup = async (input: SignupInputDTO) => {
    //validacao
    const { name, email, password } = input;
    if (!email || !name || !password) {
      throw new Error("Campos inválidos");
    }

    //conferir se o usuario existe
    const registeredUser = await this.userData.findByEmail(email);
    if (registeredUser) {
      throw new Error("Email já cadastrado");
    }

    //criar uma id pro usuario
    const id = this.idGenerator.generateId();

    //hashear o password
    const hashedPassword = await this.hashManager.hash(password);

    //criar o usuario no banco
    const user = new User(id, name, email, hashedPassword);
    await this.userData.insert(user);
    //criar o token
    const token = this.authenticator.generateToken({ id });
    //retornar o token
    return token;
  };

  login = async (input: LoginInputDTO) => {
    //validacao
    const { email, password } = input;
    if (!email || !password) {
      throw new Error("Campos inválidos");
    }

    //conferir se o usuario existe
    const user = await this.userData.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não cadastrado");
    }

    //conferir se a senha está correta
    const isPasswordCorrect = await this.hashManager.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Senha incorreta");
    }

    //criar o token
    const token = this.authenticator.generateToken({ id: user.id });
    //retornar o token
    return token;
  };

  follow = async (followed_id: string, token: string) => {
    //validacao
    if (!followed_id) {
      throw new Error("Campos inválidos");
    }
    // verificar se o usuario esta autenticado
    if (!token) {
      throw new Error("Token inválido");
    }

    // pegar informação do usuario pelo token
    const user = this.authenticator.getTokenData(token);
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    //conferir se o usuario a ser seguido existe
    const follower = await this.userData.findById(followed_id);
    if (!follower) {
      throw new Error("Usuário não cadastrado");
    }

    // conferir se o usuario ja segue o usuario a ser seguido
    const isFollowing = await this.userData.isAlreadyFollowed(
      followed_id,
      user.id
    );
    if (isFollowing) {
      throw new Error("Usuário já seguido");
    }

    //seguir o usuario
    await this.userData.follow(followed_id, user.id);

    return "Seguindo";
  };

  unfollow = async (followed_id: string, token: string) => {
    //validacao
    if (!followed_id) {
      throw new Error("Campos inválidos");
    }
    // verificar se o usuario esta autenticado
    if (!token) {
      throw new Error("Token inválido");
    }

    // pegar informação do usuario pelo token
    const user = this.authenticator.getTokenData(token);
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    //conferir se o usuario a ser seguido existe
    const follower = await this.userData.findById(followed_id);
    if (!follower) {
      throw new Error("Usuário não cadastrado");
    }

    // conferir se os usuários se seguem entre si
    const isFollowing = await this.userData.isAlreadyFollowed(
      followed_id,
      user.id
    );
    if (!isFollowing) {
      throw new Error("O usuário não segue o outro");
    }

    //parar de seguir o usuario
    await this.userData.unfollow(followed_id, user.id);

    return "Deixou de seguir";
  };
}
