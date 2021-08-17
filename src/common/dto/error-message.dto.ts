import { ApiProperty } from "@nestjs/swagger";


export class ErrorMessageDto{
    @ApiProperty({
        example: 400,
        description: 'statusCode',
        required: true,
    })
    statusCode: number;

    @ApiProperty({
        example: "2021-08-17T05:19:30.879Z",
        description: 'time',
        required: true,
    })
    timestamp: Date

    @ApiProperty({
        example: "/api/users/account",
        description: 'network url path',
        required: true,
    })
    path: string;

    @ApiProperty({
        example: "this email is exist please another email",
        description: 'error message',
        required: false,
    })
    error?: string;

    @ApiProperty({
        example: "......... another any objects",
        description: 'maybe db error message or network error message so on ....',
        required: false,
    })
    any?;
}