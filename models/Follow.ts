/**
 * @file Declares follow data type representing relationship between 2 users
 * as in a user follows another user
 */
import User from "./User";

/**
 * @typedef Follow Represents follow relationship between 2 users
 * as in a user follows another user
 * @property {User} user User being followed
 * @property {User} user User following
 */
export default class Follow {
    private follower: User | null = null;
    private following: User | null = null;
}