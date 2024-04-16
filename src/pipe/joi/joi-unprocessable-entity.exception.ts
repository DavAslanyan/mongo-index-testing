import { ValidationErrorItem } from 'joi';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class JoiUnprocessableEntityException extends HttpException {
  constructor(arg: JoiUnprocessableEntityExceptionArg[]) {
    super(arg, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export abstract class JoiUnprocessableEntityExceptionArg
  implements ValidationErrorItem
{
  @ApiProperty()
  message: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  path: Array<string | number>;
}
