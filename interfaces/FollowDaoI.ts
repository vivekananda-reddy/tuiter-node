import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsAnotherUser (uid: string, uuid:string): Promise<Follow>;
    userUnfollowsAnotherUser (uid:string, uuid: string): Promise<any>;
    findAllFollowersForUser(uid:string): Promise<Follow[]>;
    findAllUsersFollowedForUser(uid:string): Promise<Follow[]>;
    userRemovesFollower(uid:string, uuid:string): Promise<any>;
    findAllFollowPairs(): Promise<Follow[]>
};