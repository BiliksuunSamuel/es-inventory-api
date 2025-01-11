import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { ElasticSearchModule } from 'src/modules/elastic.search.module';
import { ElasticSearchService } from 'src/services/elastic.search.service';
import configuration from 'src/configuration';

@Module({
  imports: [
    ElasticSearchModule.register({ node: configuration().elasticSearchNode }),
  ],
  providers: [InventoriesService, ElasticSearchService],
  controllers: [InventoriesController],
})
export class InventoriesModule {}
