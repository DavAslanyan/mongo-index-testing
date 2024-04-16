import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';
import {
  MONGODB_URI,
  NODE_ENV,
  PORT,
  THROTTLE_LIMIT,
  THROTTLE_TTL,
} from '../../constant/env-key.const';

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    [NODE_ENV]: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    [PORT]: Joi.number().default(3000),
    [MONGODB_URI]: Joi.string().required(),
    [THROTTLE_TTL]: Joi.number().default(60),
    [THROTTLE_LIMIT]: Joi.number().default(1000),
  }),
  validationOptions: {
    abortEarly: false,
  },
};
