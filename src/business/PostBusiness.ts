import PostData from "../data/PostData";
import Post, { POST_TYPE } from "../model/Post";
import { PostInputDTO } from "../types/postInputDTO";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { CommentInputDTO } from "../types/commentInputDTO";

export default class PostBusiness {
  constructor(
    private postData: PostData,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  createPost = async (input: PostInputDTO, token: string) => {
    //validacao, o post pode ou não ter uma imagem
    const { title, body, image_url, post_type } = input;
    if (!title || !body) {
      throw new Error("Campos inválidos");
    }

    // pegar identificador do usuario pelo token
    const user = this.authenticator.getTokenData(token);

    //conferir se o usuario existe
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    // criar uma data atual para o post
    const currentTime = new Date();

    //criar uma id pro post
    const id = this.idGenerator.generateId();

    //criar o post no banco
    const post = new Post(
      id,
      title,
      body,
      post_type,
      image_url,
      currentTime,
      user.id
    );
    await this.postData.insert(post);
    //retornar o post
    return post;
  };

  getPostById = async (id: string) => {
    const post = await this.postData.findById(id);
    if (!post) {
      throw new Error("Post não encontrado");
    }
    return post;
  };

  getFeed = async (token: string, page: number) => {
    const user = this.authenticator.getTokenData(token);
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    if(!page){
      throw new Error("Página não informada");
    }

    const feed = await this.postData.getFeed(user.id, page);

    return feed;
  };

  getFeedByType = async (token: string, page: number, type: POST_TYPE) => {
    const user = this.authenticator.getTokenData(token);
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    if(!type){
      throw new Error("Tipo de post não informado");
    }

    // verificar se o tipo é valido
    if (type !== "NORMAL" && type !== "EVENT") {
      throw new Error("Tipo de post inválido");
    }

    if (!page) {
      throw new Error("Página não informada");
    }

    const feed = await this.postData.getFeedByType(user.id, page, type);

    return feed;
  };


  likePost = async (token: string, id: string) => {
    const user = this.authenticator.getTokenData(token);
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    // verificar se o post já foi curtido
    const isLiked = await this.postData.isAlreadyLiked(id, user.id);
    if (isLiked) {
      throw new Error("Post já curtido");
    }

    const post = await this.getPostById(id);
    if (!post) {
      throw new Error("Post não encontrado");
    }
    await this.postData.likePost(post.id, user.id);
    return post;
  };

  unlikePost = async (token: string, id: string) => {
    const user = this.authenticator.getTokenData(token);
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const postId = await this.postData.findById(id);
    if (!postId) {
      throw new Error("Post não encontrado");
    }

    // verificar se o post já foi curtido
    const isLiked = await this.postData.isAlreadyLiked(id, user.id);
    if (!isLiked) {
      throw new Error("Não pode descurtir um post que não foi curtido");
    }

    await this.postData.unlikePost(postId.id, user.id);

    return postId;
  };

  commentPost = async (token: string, id: string, comment: CommentInputDTO) => {
    const user = this.authenticator.getTokenData(token);
    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const post = await this.getPostById(id);
    if (!post) {
      throw new Error("Post não encontrado");
    }
    const currentTime = new Date();
    const commentId = this.idGenerator.generateId();
    await this.postData.commentPost(
      post.id,
      commentId,
      comment,
      currentTime,
      user.id
    );
    return post;
  };
}
