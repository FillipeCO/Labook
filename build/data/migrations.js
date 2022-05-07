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
const BaseDatabase_1 = require("./BaseDatabase");
class Migrations extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createTables = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection.raw(`
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
                yield this.connection.destroy();
            }
            catch (error) {
                console.log(error.sqlMessage || error.message);
                yield this.connection.destroy();
            }
        });
    }
}
new Migrations().createTables();
//# sourceMappingURL=migrations.js.map