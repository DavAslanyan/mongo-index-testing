import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { configModuleOptions } from './options/config/config-module.options';
import { mongooseModuleAsyncOptions } from './options/mongoose/mongoose-module-async.options';
import { throttlerModuleAsyncOptions } from './options/throttler/throttler-module-async.options';
import { RandomNameModule } from './random-name/random-name.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    ThrottlerModule.forRootAsync(throttlerModuleAsyncOptions),
    RandomNameModule,
  ],
})
export class AppModule {}
