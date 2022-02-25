/**
 * @file Controller RESTful Web service API for tuits resource
 */
import TuitDao from "../daos/TuitDao";
import Tuit from "../models/Tuit";
import {Express, Request, Response} from "express";
import TuitControllerI from "../interfaces/TuitControllerI";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/tuits to retrieve tuits by user</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tid to retrieve a tuit by ID </li>
 *     <li>POST /api/users/:uid/tuits to create a new tuit by user </li>
 *     <li>PUT /api/tuits/:tid to update a tuit</li>
 *     <li>DELETE /api/users/:uid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;


    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.get("/api/tuits/:tid", TuitController.tuitController.findTuitById);
            app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit);
            app.put("/api/tuits/:tid", TuitController.tuitController.updateTuit);
            app.delete("/api/tuits/:tid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }

    private constructor() {}

    /**
     * Retrieves all tuits from the database and returns an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));

    /**
     * Retrieves a tuit by user
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user
     * @param {Response} res Represents response to client, including the retrieved tuits
     */
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));


    /**
     * Retrieves a tuit by ID
     * @param {Request} req Represents request from client, including path parameter tid
     * identifying the primary key of user
     * @param {Response} res Represents response to client, including the retrieved tuit
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));


    /**
     * Create a tuit for user by user ID
     * @param {Request} req Represents request from client, including path parameter tid
     * identifying the primary key of user
     * @param {Response} res Represents response to client, including the retrieved tuit
     */
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.params.uid, req.body)
            .then((tuit: Tuit) => res.json(tuit));


    /**
     * Update a tuit by ID
     * @param {Request} req Represents request from client, including path parameter tid
     * identifying the primary key of tuit
     * @param {Response} res Represents response to client, including the status of the update
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.send(status));


    /**
     * Deleted a tuit by ID
     * @param {Request} req Represents request from client, including path parameter tid
     * identifying the primary key of tuit to be deleted
     * @param {Response} res Represents response to client, including the status of the delete
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then((status) => res.send(status));
};