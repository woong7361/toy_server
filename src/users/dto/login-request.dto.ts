import { PickType } from "@nestjs/swagger";
import { User } from "../schema/user.schema";
export class LoginRequestDto extends PickType(User, ['email', 'password'] as const){}
