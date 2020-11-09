import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { KafkaPayload } from '../kafka/kafka.message';
import { EsHostConfig } from '../config/es.config';
import { KafkaHostConfig } from '../config/kafka.config';

@Injectable()
export class EsService {
  private logger: Logger = new Logger(EsService.name);

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * Index Kafka payload message to ES node
   *
   * @param {KafkaPayload} body
   * @return {*}
   * @memberof EsService
   */
  index(body: KafkaPayload): any {
    try {
      this.logger.log('Indexing Kafka message payload...');
      return this.elasticsearchService.index({
        index: EsHostConfig.ES_INDEX,
        body: body,
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Get all log indexes from ES node
   *
   * @return {*}  {Promise<any>}
   * @memberof EsService
   */
  async search(): Promise<any> {
    const { body } = await this.elasticsearchService.search({
      index: EsHostConfig.ES_INDEX,
      body: {
        query: {
          match: {
            messageType: KafkaHostConfig.KAFKA_MESSAGE_TYPE,
          },
        },
      },
    });

    return body.hits.hits;
  }
}
