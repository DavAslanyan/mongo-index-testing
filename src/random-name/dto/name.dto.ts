import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as Joi from 'joi';

export class NameDto {
  @ApiProperty({
    description: 'Search',
  })
  name: string;
  @ApiPropertyOptional({
    description: 'Offset',
    default: 0,
  })
  offset: number;
  @ApiPropertyOptional({
    description: 'Limit',
    default: 20,
  })
  limit: number;
}

export const searchNameDTOValidator = Joi.object<NameDto>({
  name: Joi.string().required(),
  limit: Joi.number().min(1),
  offset: Joi.number().min(0),
});
