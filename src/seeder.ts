import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Name, NameSchema } from './random-name/schema/name.schema';
import { NamesSeeder } from './random-name/seed/name.seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MONGODB_URI } from './constant/env-key.const';
import { configModuleOptions } from './options/config/config-module.options';

seeder({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(MONGODB_URI),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Name.name, schema: NameSchema }]),
  ],
}).run([NamesSeeder]);
