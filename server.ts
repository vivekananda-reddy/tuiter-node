/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */


import express from 'express';
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowController from "./controllers/FollowController";
import MessageController from "./controllers/MessageController";

mongoose.connect("mongodb+srv://admin:mongopassword@cluster0.hfxse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const app = express();

app.use(express.json())

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const followController = FollowController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);


