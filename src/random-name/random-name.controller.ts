import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { swaggerConst } from '../constant/swagger.const';
import { NameResponse } from './response/name.response';
import { RandomNameService } from './random-name.service';
import { JoiValidationPipe } from '../pipe/joi/joi-validation.pipe';
import { NameDto, searchNameDTOValidator } from './dto/name.dto';
import { LoadTestingResponse } from './response/load-testing.response';

@Controller('api/v1/')
export class RandomNameController {
  constructor(private readonly randomNameService: RandomNameService) {}

  @ApiTags(swaggerConst.tag.name)
  @ApiOkResponse({
    description: 'The names',
    type: [NameResponse],
  })
  @ApiTooManyRequestsResponse(swaggerConst.apiResponse.tooManyRequests)
  @ApiNotFoundResponse(swaggerConst.apiResponse.notFound)
  @ApiInternalServerErrorResponse(swaggerConst.apiResponse.internalServerError)
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async find(
    @Query(new JoiValidationPipe(searchNameDTOValidator))
    query: NameDto,
  ): Promise<NameResponse[]> {
    return this.randomNameService.find(query);
  }

  @ApiTags(swaggerConst.tag.name)
  @ApiOperation({ summary: 'index testing.' })
  @ApiOkResponse({
    description: 'The load testing result',
    type: LoadTestingResponse,
  })
  @ApiInternalServerErrorResponse(swaggerConst.apiResponse.internalServerError)
  @Post('load-testing')
  @HttpCode(HttpStatus.OK)
  async loadTesting(): Promise<LoadTestingResponse> {
    return this.randomNameService.loadTesting();
  }
}
