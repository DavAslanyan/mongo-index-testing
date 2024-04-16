import { ApiProperty } from '@nestjs/swagger';

export class NameResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt?: Date;
}
