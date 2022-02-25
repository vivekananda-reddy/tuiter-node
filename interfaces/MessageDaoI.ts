import Follow from "../models/Follow";
import Message from "../models/Message";


export default interface MessageDaoI {
    userSendsMessageToAnotherUser (uid: string, uuid:string, message:Message): Promise<Message>;
    findSentMessagesForUser (uid:string): Promise<Message[]>;
    findReceivedMessagesForUser (uid:string): Promise<Message[]>
    userDeletesMessage(mid:string): Promise<any>;
    userEditsMessageTheySent(uid:string, mid:string, message:Message): Promise<any>;
    findAllMessages(): Promise<Message[]>
};