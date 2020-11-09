import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { KafkaPayload } from '../kafka/kafka.message';
import { KafkaHostConfig } from '../config/kafka.config';

@Injectable()
export class ProducerService {
  private logger: Logger = new Logger(ProducerService.name);

  constructor(private readonly kafkaService: KafkaService) {}

  /**
   * Send message to Kafka broker
   *
   * @param {Object} body
   * @return {*}  {Promise<Object>}
   * @memberof ProducerService
   */
  async send(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    // build Kafka message payload
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: body,
      messageType: KafkaHostConfig.KAFKA_MESSAGE_TYPE,
      topicName: KafkaHostConfig.KAFKA_TOPIC,
    };

    // send message to broker
    const value = await this.kafkaService.sendMessage(
      KafkaHostConfig.KAFKA_TOPIC,
      payload,
    );

    // log status
    this.logger.log('message status: ' + JSON.stringify(value));

    return body;
  }
}
