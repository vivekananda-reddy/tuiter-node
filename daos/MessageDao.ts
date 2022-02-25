/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../Mangoose/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance() {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }

        return MessageDao.messageDao;
    }

    /**
     * Retreives all messages from messages collection
     * @returns Promise To be notified when data is retrieved from database
     */
    findAllMessages = async(): Promise<Message[]> =>
        MessageModel.find();

    /**
     * Retrieves all received messages for a user from database
     * @param {string} uid Primary key of message
     * @returns Promise To be notified when data is retrieved from database
     */
    findReceivedMessagesForUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({receiver:uid}).populate("message").exec();

    /**
     * Retrieves all sent messages for a user from database
     * @param {string} uid Primary key of message
     * @returns Promise To be notified when data is retrieved from database
     */
    findSentMessagesForUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({sender:uid}).populate("message").exec();

    /**
     * Deletes a message from a user from database
     * @param {string} mid Primary key of message
     * @returns Promise To be notified when data is retrieved from database
     */
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id:mid});

    /**
     * Updates a message sent by a user in database
     * @param {string} uid Primary key of user to be modified
     * @param {string} mid Primary key of message to be modified
     * @param {Message} message Updated message body
     * @returns Promise To be notified when data is retrieved from database
     */
    userEditsMessageTheySent = async (uid: string, mid: string, message: Message): Promise<any> =>
        MessageModel.updateOne({_id:mid, sender:uid},{$set:message});

    /**
     * Creates a message from a user in database
     * @param {string} uid Primary key of sender
     * @param {string} uuid Primary key of receiver
     * @param {Message} message Message body
     * @returns Promise To be notified when data is retrieved from database
     */
    userSendsMessageToAnotherUser = async (uid: string, uuid: string, message:Message): Promise<Message> =>
        MessageModel.create({...message,sender:uid,receiver:uuid});

}