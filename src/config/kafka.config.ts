/**
 * Declare kafka broker configuration
 *
 * @export
 * @class KafkaConfig
 */
export class KafkaConfig {
  public static readonly KAFKA_HOST = process.env.KAFKA_HOST || 'localhost';
  public static readonly KAFKA_PORT = process.env.KAFKA_PORT || '9092';
  public static readonly KAFKA_TOPIC = process.env.KAFKA_TOPIC || 'sales-topic';
  public static readonly KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID || 'application-consumer';
}