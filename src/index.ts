import { app } from "./controller/app";
import UserBusiness from "./business/UserBusiness";
import UserController from "./controller/UserController";
import UserData from "./data/UserData";
import PostBusiness from "./business/PostBusiness";
import PostController from "./controller/PostController";
import PostData from "./data/PostData";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

const userBusiness = new UserBusiness(
    new UserData(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
)

const userController = new UserController(
    userBusiness
);

const postBusiness = new PostBusiness(
    new PostData(),
    new IdGenerator(),
    new Authenticator()
)

const postController = new PostController(
    postBusiness
);

// endpoints for users
app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)
app.post("/follow", userController.follow)
app.post("/unfollow", userController.unfollow)

// endpoints for posts
app.post("/post", postController.createPost)
app.get("/post/:id", postController.getPostById)
app.get("/feed/:page", postController.getFeed)
app.get("/feed/:page/:type", postController.getFeedByType)
app.post("/post/like/:id", postController.likePost)
app.post("/post/unlike/:id", postController.unlikePost)
app.post("/post/comment/:id", postController.commentPost)