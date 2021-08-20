import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export class MongoException extends HttpException {
  private logger = new Logger('Mongo');
    constructor(error) {
      super('mongo(DB) Error', HttpStatus.INTERNAL_SERVER_ERROR);
      this.logger.log(error);
    }
  }