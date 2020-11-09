import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EsService } from './es.service';

@ApiTags('sales-topic')
@Controller('sales-topic')
export class EsController {
  constructor(private esService: EsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sales topic' })
  @ApiOkResponse({
    description: 'Successful Request',
    type: [Object],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  search() {
    return this.esService.search();
  }
}
