import { ConfigModule, ConfigService } from '@nestjs/config';
import { MONGODB_URI } from '../../constant/env-key.const';

export const mongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>(MONGODB_URI),
    connectionFactory: (connection) => {
      //add additional plugins
      return connection;
    },
  }),
  inject: [ConfigService],
};
