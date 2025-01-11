import { ElasticSearchService } from 'src/services/elastic.search.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ApiResponseDto } from 'src/dtos/common/api.response.dto';
import { Inventory } from 'src/schemas/inventories.schema.dto';
import { InventoryRequest } from 'src/dtos/inventory/inventory.request.dto';
import { CommonResponses } from 'src/helper/common.responses.helper';
import { generateId } from 'src/utils';

@Injectable()
export class InventoriesService {
  private readonly logger = new Logger(InventoriesService.name);
  constructor(
    @Inject('ELASTIC_SEARCH_CLIENT')
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  //create inventory
  async createInventory(
    request: InventoryRequest,
  ): Promise<ApiResponseDto<Inventory>> {
    try {
      this.logger.debug('creating inventory', request);
      const doc: Inventory = {
        ...request,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: generateId(),
      };
      const res = await this.elasticSearchService.indexDocument(
        'inventories',
        doc.id,
        doc,
      );

      this.logger.debug('inventory created', res);
      return CommonResponses.CreatedResponse<Inventory>(doc);
    } catch (error) {
      this.logger.error(
        'an error occurred while creating inventory',
        request,
        error,
      );
      return CommonResponses.InternalServerErrorResponse<Inventory>();
    }
  }

  //get document by id
  async getInventoryById(id: string): Promise<ApiResponseDto<Inventory>> {
    try {
      this.logger.debug('fetching inventory by id', id);
      const res = await this.elasticSearchService.searchDocuments(
        'inventories',
        {
          query: {
            match: {
              id,
            },
          },
        },
      );

      const doc = res.hits[0]?._source;
      if (!doc) {
        this.logger.debug('inventory not found', id);
        return CommonResponses.NotFoundResponse<Inventory>();
      }
      this.logger.debug('inventory found', doc);
      return CommonResponses.OkResponse<Inventory>(doc);
    } catch (error) {
      this.logger.error(
        'an error occurred while fetching inventory',
        id,
        error,
      );
      return CommonResponses.InternalServerErrorResponse<Inventory>();
    }
  }
}
