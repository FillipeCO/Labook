import { BaseDatabase } from "./BaseDatabase";

class Migrations extends BaseDatabase {
  public createTables = async (): Promise<void> => {
    try {
      await this.connection.raw(`
        CREATE TABLE IF NOT EXISTS User_Labook(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS Labook_followers (
            followed_id VARCHAR(255) NOT NULL,
            follower_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (followed_id) REFERENCES User_Labook(id),
            FOREIGN KEY (follower_id) REFERENCES User_Labook(id)
        );
        
        CREATE TABLE IF NOT EXISTS Labook_posts (
            id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            body mediumtext NOT NULL,
            image_url VARCHAR(255),
            post_type VARCHAR(64) NOT NULL,
            created_at DATETIME NOT NULL,
            user_id VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS Labook_posts_likes (
            id VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES User_Labook(id)
        );
        
        CREATE TABLE IF NOT EXISTS Labook_posts_comments (
            id VARCHAR(255) NOT NULL,
            post_id VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            comment mediumtext NOT NULL
        )

        `);

      console.log("Tabelas criadas com sucesso");
      await this.connection.destroy();
    } catch (error: any) {
      console.log(error.sqlMessage || error.message);
      await this.connection.destroy();
    }
  };
}

new Migrations().createTables();
