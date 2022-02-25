import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    userBookmarksTuit (uid: string, tid:string): Promise<Bookmark[]>;
    userUnbookmarksTuit (uid:string, tid: string): Promise<any>;
    findAllTuitsBookmarkedByUser(uid:string): Promise<Bookmark[]>;
    userUnbookmarksAllTuits(uid:string): Promise<any>;
    findAllBookmarkedTuits(): Promise<Bookmark[]>;
};