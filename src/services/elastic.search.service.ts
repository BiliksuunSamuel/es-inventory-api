import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticSearchService {
  constructor(
    @Inject('ELASTIC_SEARCH_CLIENT') private readonly client: Client,
  ) {}

  async indexDocument(index: string, id: string, body: any) {
    return this.client.index({ index, id, body });
  }

  async searchDocuments(index: string, query: any) {
    return this.client.search({ index, body: query });
  }

  async updateDocument(index: string, id: string, body: any) {
    return this.client.update({ index, id, body: { doc: body } });
  }

  async deleteDocument(index: string, id: string) {
    return this.client.delete({ index, id });
  }
}
