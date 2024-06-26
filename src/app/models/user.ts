import { Role } from "../enums/role";

export class User {
     id? : string;
     firstName? : String;
     lastName? : String;
     email? : String;
     password? : String;
     role? : Role;
}
