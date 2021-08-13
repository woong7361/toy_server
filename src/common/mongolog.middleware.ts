import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class MongoLogMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection){}
  private logger = new Logger('Mongodb');
  use(req: Request, res: Response, next: NextFunction ) {
    this.logger.log('a');
    try{
      this.connection.once('open', ()=>{
        this.logger.log('mongodb connection successly')
      })}catch(error){
        this.logger.log(error)
      }
    res.on('finish',()=>{
      mongoose.set('debug',true);
    })
    next();
  }
}
