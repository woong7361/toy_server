import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class MongoLogMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection){}
  private logger = new Logger('Mongodb');
  use(req: Request, res: Response, next: NextFunction ) {
    mongoose.set('debug',true);
    // res.on('finish',()=>{
    // })
    next();
  }
}
