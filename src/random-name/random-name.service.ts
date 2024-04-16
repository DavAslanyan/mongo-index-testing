import { Injectable } from '@nestjs/common';
import { Name, NameDocument } from './schema/name.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { NameResponse } from './response/name.response';
import { NameDto } from './dto/name.dto';
import { LoadTestingResponse } from './response/load-testing.response';

@Injectable()
export class RandomNameService {
  constructor(@InjectModel(Name.name) private nameModel: Model<NameDocument>) {}

  async find(dto: NameDto): Promise<NameResponse[]> {
    const { name, offset, limit } = dto;

    const result = await this.nameModel.aggregate([
      { $match: { name: name } },
      // { $match: { name: new RegExp(name, "i") } },
      { $skip: Number(offset) || 0 },
      { $limit: Number(limit) || 20 },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$name',
          createdAt: '$createdAt',
        },
      },
    ]);
    return result as NameResponse[];
  }

  async loadTesting(): Promise<LoadTestingResponse> {
    // make 500 request to db without index
    const indexes = await this.nameModel.collection.getIndexes();
    //removing indexes
    if (indexes['name_1']) {
      await this.nameModel.collection.dropIndex('name_1');
    }

    if (indexes['name_text']) {
      await this.nameModel.collection.dropIndex('name_text');
    }

    const promisesWithoutIndex = [];
    let startTime = Date.now();
    for (let i = 0; i < 50; i++) {
      const randomName = Math.random().toString(36).substring(2, 12);
      promisesWithoutIndex.push(this.nameModel.find({ name: randomName }));
    }
    await Promise.all(promisesWithoutIndex);
    let endTime = Date.now();
    const durationWithoutIndex = endTime - startTime;

    //createIndex
    await this.nameModel.collection.createIndex('name');

    const promisesWithIndex = [];
    startTime = Date.now();
    for (let i = 0; i < 5000; i++) {
      const randomName = Math.random().toString(36).substring(2, 12);
      promisesWithIndex.push(this.nameModel.find({ name: randomName }));
    }
    await Promise.all(promisesWithIndex);
    endTime = Date.now();
    const durationWithIndex = endTime - startTime;

    //removing indexes
    await this.nameModel.collection.dropIndex('name_1');

    await this.nameModel.collection.createIndex({ name: 'text' });

    const promisesWithTextIndex = [];
    startTime = Date.now();
    for (let i = 0; i < 5000; i++) {
      const randomName = Math.random().toString(36).substring(2, 12);
      promisesWithTextIndex.push(
        this.nameModel.find({ $text: { $search: randomName } }),
      );
    }
    await Promise.all(promisesWithTextIndex);
    endTime = Date.now();
    const durationWithTextIndex = endTime - startTime;

    return {
      withoutIndex: {
        dbRequestsCount: 50,
        durationMS: durationWithoutIndex,
      },
      withIndex: {
        dbRequestsCount: 5000,
        durationMS: durationWithIndex,
      },
      withTextIndex: {
        dbRequestsCount: 5000,
        durationMS: durationWithTextIndex,
      },
    };
  }
}
