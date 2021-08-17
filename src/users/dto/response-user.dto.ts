import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "../schema/user.schema";
export class ResponseUserDto extends PickType(User, ['email', 'name'] as const){
    @ApiProperty({
        example: "611b09a37d57391c9c881cd3",
        description: 'id',
        required: true,
    })
    _id: string;

    @ApiProperty({
        example: "2021-08-17T00:58:11.019Z",
        description: 'createdAt',
        required: true,
    })
    createdAt: Date;

    @ApiProperty({
        example: "2021-08-17T00:58:11.019Z",
        description: 'updatedAt',
        required: true,
    })
    updatedAt: Date;

    @ApiProperty({
        example: 0,
        description: 'version?',
        required: true,
    })
    __v: number;

    @ApiProperty({
        example: "$2b$05$XI4hw6Geu0OSmhX5rCvtLumWhsdqZxZNGiKIwijBkHJhiTAfodIsC",
        description: 'hashed password',
        required: true,
    })
    password: string;
}
