import { Request, Response } from "express";
import PostBusiness from "../business/PostBusiness";
import { PostInputDTO } from "../types/postInputDTO";
import { CommentInputDTO } from "../types/commentInputDTO";

export default class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public createPost = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const post: PostInputDTO = {
        title: req.body.title,
        body: req.body.body,
        image_url: req.body.image_url,
        post_type: req.body.post_type,
      };
      await this.postBusiness.createPost(post, token);
      res.status(200).send({
        message: "Post criado com sucesso",
        post,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro no criação de post");
    }
  };

  public getPostById = async (req: Request, res: Response) => {
    try {
      const post = await this.postBusiness.getPostById(req.params.id);
      res.status(200).send({
        message: "Post encontrado com sucesso",
        post,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro ao encontrar post");
    }
  };

  public getFeed = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const feed = await this.postBusiness.getFeed(token);
      res.status(200).send({
        message: "Feed encontrado com sucesso",
        feed,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro ao encontrar feed");
    }
  };

  public getFeedByType = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const feed = await this.postBusiness.getFeedByType(
        token,
        req.params.type
      );
      res.status(200).send({
        message: "Feed encontrado com sucesso",
        feed,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro ao encontrar feed");
    }
  };

  public getFeedByPage = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const page = req.params.page;
      const feed = await this.postBusiness.getFeedByPage(token, parseInt(page));
      res.status(200).send({
        message: "Feed encontrado com sucesso",
        feed,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro ao encontrar feed");
    }
  };

  public likePost = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      await this.postBusiness.likePost(token, req.params.id);
      res.status(200).send({
        message: "Post curtido com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro ao curtir post");
    }
  };

  public unlikePost = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      await this.postBusiness.unlikePost(token, req.params.id);
      res.status(200).send({
        message: "Post descurtido com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro ao descutir o post");
    }
  };

  public commentPost = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const comment: CommentInputDTO = {
        comment: req.body.comment,
      };
      await this.postBusiness.commentPost(token, req.params.id, comment);
      res.status(200).send({
        message: "Comentário adicionado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro ao adicionar comentário");
    }
  };
}
