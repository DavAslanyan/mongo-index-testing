import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Name } from '../schema/name.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class NamesSeeder implements Seeder {
  constructor(
    @InjectModel(Name.name) private readonly nameModel: Model<Name>,
  ) {}

  async seed(): Promise<any> {
    for (let i = 1; i <= 100; i++) {
      const names = DataFactory.createForClass(Name).generate(100000);

      // Insert into the database.
      await this.nameModel.insertMany(names);
      console.log('completed', i);
    }
  }

  async drop(): Promise<any> {
    return this.nameModel.deleteMany({});
  }
}
