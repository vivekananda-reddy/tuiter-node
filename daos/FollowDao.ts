/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../Mangoose/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of follows
 * @property {FollowDao} FollowDao Private single instance of UserDao
 */
export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }

        return FollowDao.followDao
    }

    private constructor() {
    }


    /**
     * Retrieves all follower and following pairs from database
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllFollowPairs = async (): Promise<Follow[]> =>
        FollowModel.find();

    /**
     * Retrieves all followers for User from database
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllFollowersForUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({following: uid});

    /**
     * Retrieves all users followed by a particular user from database
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllUsersFollowedForUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({follower: uid});

    /**
     * Retrieves users that liked a tuit from database
     * @param {string} uid Primary key of user who initiated follow request
     * @param {string} uuid Primary key of the user who is followed
     * @returns Promise To be notified when data is retrieved from database
     */
    userFollowsAnotherUser = async (uid: string, uuid: string): Promise<any> =>
        FollowModel.create({follower: uid, following: uuid});

    /**
     * Deletes a follower for a user from database
     * @param {string} uid Primary key of user who deletes their follower
     * @param {string} uuid Primary key of the user who is removed from followers
     * @returns Promise To be notified when data is retrieved from database
     */
    userRemovesFollower = async (uid: string, uuid: string): Promise<any> =>
        FollowModel.deleteOne({follower: uuid, following: uid});

    /**
     * Deletes a follow relation for a user from database
     * @param {string} uid Primary key of user who unfollows
     * @param {string} uuid Primary key of the user who unfollowed
     * @returns Promise To be notified when data is retrieved from database
     */
    userUnfollowsAnotherUser = async (uid: string, uuid: string): Promise<any> =>
        FollowModel.deleteOne({follower: uid, following: uuid});

}