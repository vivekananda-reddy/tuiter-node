/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../Mangoose/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Retrieves all bookmarks from database
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllBookmarkedTuits = async () : Promise<Bookmark[]> =>
        BookmarkModel.find();

    /**
     * Retrieves all tuits bookmarked by user from database
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({user:uid}).populate("tuit").exec();

    /**
     * Creates a bookmark for a user from database
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when data is retrieved from database
     */
    userBookmarksTuit = async(uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({user:uid, tuit:tid});

    /**
     * Removes all bookmark for a user from database
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when data is retrieved from database
     */
    userUnbookmarksAllTuits = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({user:uid});

    /**
     * Removes a bookmark for a user from database
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when data is retrieved from database
     */
    userUnbookmarksTuit = async (uid: string, tid:string): Promise<any> =>
        BookmarkModel.deleteOne({user:uid, tuit:tid});

}