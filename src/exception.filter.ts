import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseBody = {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Success',
    };

    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();
      responseBody.response = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      response.statusCode = 422;
      responseBody.response = exception.message.trim().split('\n').at(-1);
    } else {
      responseBody.statusCode = 500;
      responseBody.response = 'Internal Server Error';
    }

    response.status(responseBody.statusCode).json(responseBody);

    super.catch(exception, host);
  }
}
