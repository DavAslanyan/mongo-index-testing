import { ApiProperty } from '@nestjs/swagger';

export class LoadTestingResponse {
  @ApiProperty()
  withoutIndex: {
    dbRequestsCount: number;
    durationMS: number;
  };
  @ApiProperty()
  withIndex: {
    dbRequestsCount: number;
    durationMS: number;
  };
  @ApiProperty()
  withTextIndex: {
    dbRequestsCount: number;
    durationMS: number;
  };
}
