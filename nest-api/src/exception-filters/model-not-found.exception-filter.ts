import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(EntityNotFoundError)
export class ModelNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    return response.status(404).json({
      error: {
        error: 'Not found!',
        message: exception.message,
      },
    });
  }
}
