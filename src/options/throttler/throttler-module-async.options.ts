import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { THROTTLE_LIMIT, THROTTLE_TTL } from '../../constant/env-key.const';
import { ThrottlerOptions } from '@nestjs/throttler/dist/throttler-module-options.interface';

export const throttlerModuleAsyncOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return [
      {
        ttl: config.get(THROTTLE_TTL),
        limit: config.get(THROTTLE_LIMIT),
      } as ThrottlerOptions,
    ];
  },
};
