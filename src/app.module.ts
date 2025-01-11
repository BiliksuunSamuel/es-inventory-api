import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InventoriesModule } from './inventories/inventories.module';
import configuration from './configuration';
import { ElasticSearchModule } from './modules/elastic.search.module';
import { ElasticSearchService } from './services/elastic.search.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    InventoriesModule,
    ElasticSearchModule.register({ node: configuration().elasticSearchNode }),
  ],
  controllers: [AppController],
  providers: [AppService, ElasticSearchService],
})
export class AppModule {}
