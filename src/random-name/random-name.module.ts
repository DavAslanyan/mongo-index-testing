import { Module } from '@nestjs/common';
import { RandomNameController } from './random-name.controller';
import { RandomNameService } from './random-name.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Name, NameSchema } from './schema/name.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Name.name, schema: NameSchema }]),
    ConfigModule,
  ],
  controllers: [RandomNameController],
  providers: [RandomNameService, ConfigService],
  exports: [RandomNameService],
})
export class RandomNameModule {}
