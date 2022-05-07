import Post from "../model/Post";
import { BaseDatabase } from "./BaseDatabase";
import { FindPostResponse } from "../types/findPostResponse";
import { FindFollowersResponse } from "../types/findFollowersResponse";
import { FindLikedResponse } from "../types/findLikedResponse";
import { CommentInputDTO } from "../types/commentInputDTO";

export default class PostData extends BaseDatabase {
  protected TABLE_NAME = "Labook_posts";
  protected FOLLOWERS_TABLE_NAME = "Labook_followers";
  protected POST_LIKES_TABLE_NAME = "Labook_posts_likes";
  protected COMMENTS_TABLE_NAME = "Labook_posts_comments";

  insert = async (post: Post) => {
    try {
      await this.connection(this.TABLE_NAME).insert(post);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
      }
    }
  };

  findById = async (id: string) => {
    try {
      const queryResult: FindPostResponse = await this.connection(
        this.TABLE_NAME
      )
        .select()
        .where({ id });

      return queryResult[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
      }
    }
  };

  getFeed = async (id: string) => {
    try {
      const queryResultFollowers: FindFollowersResponse = await this.connection(
        this.FOLLOWERS_TABLE_NAME
      )
        .select()
        .where({ follower_id: id });

      const followedUsersIds = queryResultFollowers.map(
        (follower) => follower.followed_id
      );

      const queryResultPosts: FindPostResponse = await this.connection(
        this.TABLE_NAME
      )
        .select()
        .where({ user_id: followedUsersIds })
        .orderBy("created_at", "desc");

      return queryResultPosts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
      }
    }
  };

  getFeedByType = async (id: string, type: string) => {
    try {
      const queryResultFollowers: FindFollowersResponse = await this.connection(
        this.FOLLOWERS_TABLE_NAME
      )
        .select()
        .where({ follower_id: id });

      const followedUsersIds = queryResultFollowers.map(
        (follower) => follower.followed_id
      );

      const queryResultPosts: FindPostResponse = await this.connection(
        this.TABLE_NAME
      )
        .select()
        .where({ user_id: followedUsersIds, post_type: type })
        .orderBy("created_at", "desc");

      return queryResultPosts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };

  getFeedByPage = async (id: string, page: number) => {
    try {
      const queryResultFollowers: FindFollowersResponse = await this.connection(
        this.FOLLOWERS_TABLE_NAME
      )
        .select()
        .where({ follower_id: id });

      const followedUsersIds = queryResultFollowers.map(
        (follower) => follower.followed_id
      );

      const queryResultPosts: FindPostResponse = await this.connection(
        this.TABLE_NAME
      )
        .select()
        .where({ user_id: followedUsersIds })
        .orderBy("created_at", "desc")
        .limit(5)
        .offset((page - 1) * 5);

      return queryResultPosts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };

  likePost = async (postId: string, userId: string) => {
    try {
      await this.connection(this.POST_LIKES_TABLE_NAME).insert({
        id: postId,
        user_id: userId,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };

  isAlreadyLiked = async (postId: string, userId: string) => {
    try {
      const queryResult: FindLikedResponse = await this.connection(
        this.POST_LIKES_TABLE_NAME
      )
        .select()
        .where({ id: postId, user_id: userId });

      return queryResult.length > 0;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };

  unlikePost = async (postId: string, userId: string) => {
    try {
      await this.connection(this.POST_LIKES_TABLE_NAME)
        .where({ id: postId, user_id: userId })
        .del();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };

  commentPost = async (
    commentId: string,
    userId: string,
    comment: CommentInputDTO,
    created_at: Date,
    postId: string
  ) => {
    try {
      await this.connection(this.COMMENTS_TABLE_NAME).insert({
        id: commentId,
        user_id: userId,
        comment,
        created_at,
        post_id: postId,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };
}
