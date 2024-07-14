import { Directive, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserField {
  @Directive('@external')
  id?: string;
}

export class User extends UserField {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  profilePhoto?: string;

  accountRole?: string;
}
/*{
  "id": "100000000000",
  "text": "i love football",
  "created": "12/07/2024",
  "sender" : {
  "id": "100000000000",
  "email":"fsdfdgdfg@gmail.com",
  "firstName":"Rukieya",
  "lastName": "Ainoo",
  "profilePhoto":"not applicable",
  "accountRole": "Student"
}
}*/
export type MessageSender = Omit<User, 'email' | 'lastName'>;
