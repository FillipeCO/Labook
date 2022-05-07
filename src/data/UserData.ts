import User from "../model/User";
import { FindByEmailResponse } from "../types/findByEmailResponse";
import { FindByIdResponse } from "../types/findByIdResponse";
import { FindFollowersResponse } from "../types/findFollowersResponse";
import { BaseDatabase } from "./BaseDatabase";

export default class UserData extends BaseDatabase {
  protected TABLE_NAME = "User_Labook";
  protected FOLLOWERS_TABLE_NAME = "Labook_followers";

  insert = async (user: User) => {
    try {
      await this.connection(this.TABLE_NAME).insert(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erro do banco !");
      }
    }
  };

  findByEmail = async (email: string) => {
    try {
      const queryResult: FindByEmailResponse = await this.connection(
        this.TABLE_NAME
      )
        .select()
        .where({ email });

      return queryResult[0];
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
      const queryResult: FindByIdResponse = await this.connection(
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

  follow = async (followed_id: string, follower_id: string) => {
    try {
      await this.connection(this.FOLLOWERS_TABLE_NAME).insert({
        followed_id,
        follower_id,
      });

      // para fazer com que os dois se sigam ao mesmo tempo, implementar:
      // await this
      //     .connection(this.FOLLOWERS_TABLE_NAME)
      //     .insert({ follower_id, followed_id })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };

  unfollow = async (followed_id: string, follower_id: string) => {
    try {
      await this.connection(this.FOLLOWERS_TABLE_NAME)
        .where({ followed_id, follower_id })
        .del();

      // para fazer com que os dois deixem de seguir ao mesmo tempo, implementar:
      // await this
      //     .connection(this.FOLLOWERS_TABLE_NAME)
      //     .where({ follower_id, followed_id })
      //     .del()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };

  isAlreadyFollowed = async (followed_id: string, follower_id: string) => {
    try {
      const queryResult: FindFollowersResponse = await this.connection(
        this.FOLLOWERS_TABLE_NAME
      )
        .select()
        .where({ followed_id, follower_id });

      return queryResult.length > 0;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro do banco !");
    }
  };
}
