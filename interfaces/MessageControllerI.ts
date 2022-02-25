import {Request, Response} from "express";


export default interface MessageControllerI {
    userSendsMessageToAnotherUser(req: Request, res: Response): void;
    findSentMessagesForUser(req: Request, res: Response): void;
    findReceivedMessagesForUser(req: Request, res: Response): void;
    userDeletesMessage(req: Request, res: Response): void;
    userEditsMessageTheySent(req: Request, res: Response): void;
    findAllMessages(req: Request, res: Response): void;
}
