/**
 * @file Declares Tuit data type representing tuits
 */

import User from "./User";

/**
 * @typedef Tuit Represents bookmark relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {string} tuit Tuit text being posted
 * @property {User} postedBy User posting the tuit
 * @property {Date} postedOn Date tuit is posted
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}
