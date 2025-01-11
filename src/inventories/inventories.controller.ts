import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { InventoriesService } from './inventories.service';
import { InventoryRequest } from 'src/dtos/inventory/inventory.request.dto';
import { Response } from 'express';

@Controller('api/inventories')
@ApiTags('Inventories')
export class InventoriesController {
  constructor(private readonly inventoryService: InventoriesService) {}

  //create
  @Post()
  async createInventory(
    @Body() request: InventoryRequest,
    @Res() response: Response,
  ) {
    const res = await this.inventoryService.createInventory(request);
    response.status(res.code).send(res);
  }

  //get by id
  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  async getInventoryById(@Res() response: Response, @Param('id') id: string) {
    const res = await this.inventoryService.getInventoryById(id);
    response.status(res.code).send(res);
  }
}
