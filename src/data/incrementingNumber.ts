// In the background, increment a number every second and notify subscribers when it changes.
import { pubsub } from '../lib/pubsub';

export let currentNumber = 0;

export const incrementNumber = () => {
  currentNumber++;
  pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });
}
