/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import TuitModel from "../Mangoose/TuitModel";
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }


    private constructor() {}

    /**
     * Retreives all tuits from tuits collection
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();


    /**
     * Retrieves tuits which a user created from database
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when data is retrieved from database
     */
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});
    //Used findTuitByID and createTuit functions from professor's Github

    /**
     * Retrieves tuits by ID from database
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when data is retrieved from database
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid).populate("postedBy").exec();

    /**
     * Creates tuits from a user in database
     * @param {string} uid Primary key of user
     * @param {Tuit} tuit Tuit data to be created
     * @returns Promise To be notified when data is retrieved from database
     */
    createTuit = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates tuits from a user in database
     * @param {string} tid Primary key of user to be modified
     * @param {Tuit} tuit Tuit data to be updated
     * @returns Promise To be notified when data is retrieved from database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne({_id: tid}, {$set: tuit});

    /**
     * Deletes tuit in database
     * @param {string} tid Primary key of user
     * @returns Promise To be notified when data is retrieved from database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});
}