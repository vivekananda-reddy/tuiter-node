/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import Bookmark from "../models/Bookmark";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark</li>
 *     <li>DELETE /api/users/:uid/unbookmarks/:tid to remove a bookmarked tuit for a user </li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all bookmarks for a user </li>
 *     <li>DELETE /api/users/:uid/unbookmarks to remove all tuits bookmarked by a user </li>
 *     <li>GET /api/bookmarks to remove all bookmarks</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit );
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.delete("/api/users/:uid/unbookmarks", BookmarkController.bookmarkController.userUnbookmarksAllTuits);
            app.get("/api/bookmarks", BookmarkController.bookmarkController.findAllBookmarkedTuits);

        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Creates a bookmark for a tuit by a user in database
     * @param {Request} req Represents request from client including primary key of the user and
     * tuit in path parameter as uid and tid
     * @param {Response} res Represents response to client including the bookmark details
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then((bookmark: Bookmark) => res.json(bookmark));

    /**
     * Deletes a bookmark in database
     * @param {Request} req Represents request from client including primary key of the user and
     * tuit in path parameter as uid and tid
     * @param {Repsonse} res Represents response to client including the status of the operation
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then((bookmark: Bookmark) => res.json(bookmark));
    /**
     * Retrieves all tuits bookmarked by a user from database
     * @param {Request} req Represents request from client including primary key of user in
     * path parameter as uid
     * @param {Response} res Represents response from client including array of bookmarks
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then((bookmark: Bookmark[]) => res.json(bookmark));

    /**
     * Deletes all bookmarks made by a user in database
     * @param {Request} req Represents request from client including primary key of user in
     * path parameter as uid
     * @param {Response} res Represents response to client including the status of operation
     */
    userUnbookmarksAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksAllTuits(req.params.uid)
            .then((status) => res.json(status));


    /**
     * Retrieves all bookmarked tuits by a user from database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client including array of all bookmarks
     */
    findAllBookmarkedTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarkedTuits()
            .then((bookmark:Bookmark[]) => res.send(bookmark));

};