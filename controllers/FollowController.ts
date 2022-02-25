/**
 * @file Controller RESTful Web service API for follows resource
 */
import FollowControllerI from "../interfaces/FollowControllerI";
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import Follow from "../models/Follow";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/follows/:uuid to create a new follow pair instance</li>
 *     <li>DELETE /api/users/:uid/unfollows/:uuid to unfollow another user</li>
 *     <li>GET /api/users/:uid/followers to retrieve all followers for user </li>
 *     <li>GET /api/users/:uid/followings to retrieve all followings for a user </li>
 *     <li>DELETE /api/users/:uid/followers/:uuid to remove a particular follower for a user</li>
 *     <li>GET /api/follows to retrieve all follow pairs in database </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI{

    private static followController:FollowController | null = null;
    private static followDao: FollowDao = FollowDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app:Express) : FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:uuid", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/unfollows/:uuid", FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllFollowersForUser);
            app.get("/api/users/:uid/followings", FollowController.followController.findAllUsersFollowedForUser);
            app.delete("/api/users/:uid/followers/:uuid", FollowController.followController.userRemovesFollower);
            app.get("/api/follows", FollowController.followController.findAllFollowPairs);

        }

        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all follow pairs from database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client including array of all follow pairs
     */
    findAllFollowPairs = (req:Request, res: Response) =>
        FollowController.followDao.findAllFollowPairs()
            .then((follows: Follow[]) => res.json(follows));

    /**
     * Retrieves all followers for a user from database
     * @param {Request} req Represents request from client including primary key of the user in
     * path parameter as uid
     * @param {Response} res Represents response to client including array of all followers
     */
    findAllFollowersForUser = (req:Request, res: Response) =>
        FollowController.followDao.findAllFollowersForUser(req.params.uid)
            .then((follows:Follow[]) => res.json(follows));

    /**
     * Retrieves all users followed for a user from database
     * @param {Request} req Represents request from client including primary key of the user in
     * path parameter as uid
     * @param {Response} res Represents response from client including arrays of all followed users
     */
    findAllUsersFollowedForUser = (req:Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedForUser(req.params.uid)
            .then((follows:Follow[]) => res.json(follows));

    /**
     * Creates a follow pair in database
     * @param {Request} req Represents request from client including primary key of the user
     * follower and following users in path parameters as uid and uuid
     * @param {Response} res Represents response to client including the follow pair
     */
    userFollowsAnotherUser = (req:Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.uuid)
            .then((follow:Follow) => res.json(follow))

    /**
     * Deletes a follower for a user from database
     * @param {Request} req Represents request from client including primary key of follower
     * and following users in path parameters as uid and uuid
     * @param {Response} res Represents response to client, includes status of the operation
     */
    userRemovesFollower = (req:Request, res: Response) =>
        FollowController.followDao.userRemovesFollower(req.params.uid, req.params.uuid)
            .then((status) => res.json(status))

    /**
     * Deletes a following user for a user from database
     * @param {Request} req Represents request from client including primary key of follower and
     * following users in path parameters as uid and uuid
     * @param {Response} res Represents response to client, includes status of the operation
     */
    userUnfollowsAnotherUser = (req:Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uuid)
            .then((status) => res.json(status))

}