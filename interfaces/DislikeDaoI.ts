import Like from "../models/dislikes/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */
export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit (tid: string): Promise<Like[]>;
    findAllTuitsDislikedByUser (uid: string): Promise<Like[]>;
    userUndislikesTuit (tid: string, uid: string): Promise<any>;
    userDislikesTuit (tid: string, uid: string): Promise<Like>;
};