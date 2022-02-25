/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../Mangoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Retrieves users that liked a tuit from database
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Retrieves all tuits likes by user from database
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();
    /**
     * Creates a like in database for a user and a tuit
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when data is retrieved from database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Remaves a like in database for a user
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @return Promise To be notified when data is retrieved from database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}