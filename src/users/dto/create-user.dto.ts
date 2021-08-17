import { PickType } from "@nestjs/swagger";
import { User } from "../schema/user.schema";
export class CreateUserDto extends PickType(User, ['email', 'name', 'password'] as const){

}
