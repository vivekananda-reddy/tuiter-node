/**
 * @file Declares message data type representing relationship user sends a message to another user
 */
import User from "./User";

/**
 * @typedef Message Represents message relationship between a users
 * @property {String} message Message being sent
 * @property {User} sender User sending the message
 * @property {User} receiver User receiving the message
 * @property {Date} sentOn date of the message
 */
export default class Message {
    private message: string = '';
    private sender: User | null = null;
    private receiver: User | null = null;
    private sentOn: Date = new Date();

}