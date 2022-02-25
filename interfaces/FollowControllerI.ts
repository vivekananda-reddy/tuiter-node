import {Request, Response} from "express";


export default interface FollowControllerI {
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowsAnotherUser(req: Request, res: Response): void;
    findAllFollowersForUser(req: Request, res: Response): void;
    findAllUsersFollowedForUser(req: Request, res: Response): void;
    userRemovesFollower(req: Request, res: Response): void;
    findAllFollowPairs(req: Request, res: Response): void;
}
