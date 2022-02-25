/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Response, Request} from "express";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/messages/:uuid to create a new user message instance</li>
 *     <li>GET /api/users/:uid/sentmessages to retrieve all sent messages by a user</li>
 *     <li>GET /api/users/:uid/receivedmessages to retrieve all received messages by a user  </li>
 *     <li>DELETE /api/messages/:mid to delete a message </li>
 *     <li>PUT /api/users/:uid/messages/:mid to update a message user sent</li>
 *     <li>GET /api/messages to retrieve all messages</li>
 * </ul>
 * @property {MessageDao} MessageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao:MessageDao = MessageDao.getInstance();
    private static messageController:MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns MessageController
     */
    public static getInstance = (app:Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid/messages/:uuid", MessageController.messageController.userSendsMessageToAnotherUser);
            app.get("/api/users/:uid/sentmessages", MessageController.messageController.findSentMessagesForUser);
            app.get("/api/users/:uid/receivedmessages", MessageController.messageController.findReceivedMessagesForUser);
            app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
            app.put("/api/users/:uid/messages/:mid", MessageController.messageController.userEditsMessageTheySent);
            app.get("/api/messages", MessageController.messageController.findAllMessages);
        }

        return MessageController.messageController;
    }

    private constructor(){}

    /**
     * Retrieves all messages from database and returns an array of messages
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, containing array of messages
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessages()
            .then((messages) => res.json(messages));

    /**
     * Retrieves all received messages for received by a user
     * @param {Request} req Represents request from client containing primary key of user, uid
     * @param {Response} res Represents response to client, containing array of messages
     */
    findReceivedMessagesForUser = (req: Request, res: Response) =>
        MessageController.messageDao.findReceivedMessagesForUser(req.params.uid)
            .then((messages) => res.json(messages));

    /**
     * Retrieves all messages sent by user from database
     * @param {Request} req Represents request from client containing primary key of user, uid
     * @param {Response} res Represents response to client, containing array of messages
     */
    findSentMessagesForUser = (req: Request, res: Response) =>
        MessageController.messageDao.findSentMessagesForUser(req.params.uid)
            .then((messages) => res.json(messages));

    /**
     * Deletes a message form database
     * @param {Request} req Represents request from client containing primary key of message,mid
     * @param {Response} res Represents response to client, containing the status of the operation
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then((status) => res.json(status));

    /**
     * Updates a message sent by User in database
     * @param {Request} req Represents request from client containing primary key of message and
     *  user in path parameters as mid and uid. Also contains request body with message to be updated
     * @param res
     */
    userEditsMessageTheySent = (req: Request, res: Response) =>
        MessageController.messageDao.userEditsMessageTheySent(req.params.uid, req.params.mid, req.body)
            .then((status) => res.json(status));

    /**
     * Creates a message in database
     * @param {Request} req Represents request from client containing the message in request body and
     * primary key of sender and receiver in path parameters as uid, uuid
     * @param {Response} res Represents response to client containing the message
     */
    userSendsMessageToAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessageToAnotherUser(req.params.uid, req.params.uuid, req.body)
            .then((message) => res.json(message));

}