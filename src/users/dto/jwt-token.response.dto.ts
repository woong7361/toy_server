import { ApiProperty } from "@nestjs/swagger";

export class JwtResponseDto{
    @ApiProperty({
        description:'jwt token',
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTFiNDZlMTUyNTIxMDM5OWIxMmRhNjQiLCJpYXQiOjE2MjkyNTY4MzUsImV4cCI6MTYyOTI1NzAxNX0.jqZr3zomW2syNN2N1b0G0NDj4OTLi2KiJpKv9oqB1ks",
        required: true,
    })
    access_token: string
}