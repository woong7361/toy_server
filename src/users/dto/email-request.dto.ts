import { PickType } from "@nestjs/swagger";
import { User } from "../schema/user.schema";
export class RequestEmail extends PickType(User, ['email'] as const){

}
