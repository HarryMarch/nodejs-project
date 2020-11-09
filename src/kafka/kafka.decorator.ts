export const SUBSCRIBER_FN_REF_MAP = new Map();
export const SUBSCRIBER_OBJ_REF_MAP = new Map();

/**
 * Kafka Consumer Decorator
 *
 * @export
 * @param {string} topic
 * @return {*}
 */
export function SubscribeToGroup(topic: string) {
  return (target, propertyKey, descriptor) => {
    const originalMethod = target[propertyKey];
    SUBSCRIBER_FN_REF_MAP.set(topic, originalMethod);
    return descriptor;
  };
}
