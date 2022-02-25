/**
 * @file Declares User data type representing users
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents users in Tuiter
 * @property {string} userName User name of the user
 * @property {string} password password for the user account
 * @property {string} firstName first name of the user
 * @property {string} lastName last name of the user
 * @property {string} email email of the user
 * @property {string} profilePhoto profile photo of user
 * @property {string} headerImage header image of user
 * @property {AccountType} accountType account type of user
 * @property {MaritalStatus} maritalStatus marital status of user
 * @property {string} biography biography of the user
 * @property {Date} dateOfBirth date of birth of user
 * @property {Date} joined joining date of user
 * @property {Location} location location of user
 */
export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}
