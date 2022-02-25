/**
 * @file Declares bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import User from "./User";
import Tuit from "./Tuit";

/**
 * @typedef Bookmark Represents bookmark relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} tuit Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarking the tuit
 */
export default class Bookmark {
    private user: User | null = null;
    private tuit: Tuit | null = null;
}