import express from 'express';
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";

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
const PORT = 4000;
app.listen(process.env.PORT || PORT);


