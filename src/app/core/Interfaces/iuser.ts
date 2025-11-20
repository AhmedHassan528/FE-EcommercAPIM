export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  serRoles?: UserRoles | string[] | string;
  userRoles?: string[];
  phoneNumber: any;
}

export interface UserRoles {
  $id?: string;
  $values?: string[];
}
