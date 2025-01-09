import { Client } from '@elastic/elasticsearch';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class ElasticSearchModule {
  static register(options: { node: string }): DynamicModule {
    const clientProvider = {
      provide: 'ELASTIC_SEARCH_CLIENT',
      useFactory: () => new Client(options),
    };

    return {
      module: ElasticSearchModule,
      providers: [clientProvider],
      exports: [clientProvider],
    };
  }
}
