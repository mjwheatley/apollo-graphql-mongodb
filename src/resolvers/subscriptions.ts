import { SubscriptionResolvers } from '@graphql';
import IncrementingNumberResolvers from './IncrementingNumber';
import MovieResolvers from './Movies';

// Use the generated `SubscriptionResolvers` type
// to type check our subscriptions!
const subscriptions: SubscriptionResolvers = {
  ...IncrementingNumberResolvers.Subscription,
  ...MovieResolvers.Subscription
};

export default subscriptions;
