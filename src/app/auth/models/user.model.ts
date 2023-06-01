export class User {
  id!: string;
  token!: string;
  userType!: UserType;
  firstLogin!: boolean;
  email!: string;
  username!: string;
  phoneNumber!: string;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  dob?: string;
  CIN?: string;
}

export enum UserType {
  CLIENT = 'Client',
  ADMIN = 'Admin',
  AGENT = 'Agent',
}
