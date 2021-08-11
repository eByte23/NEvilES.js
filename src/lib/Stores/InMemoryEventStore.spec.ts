import test from 'ava';

import { CustomerAggregate, CustomerCreated } from '../BaseAggregate.spec';

import { InMemoryEventStore } from './InMemoryEventStore';

// import { asyncABC } from './old/async';

// test('getABC', async (t) => {
//   t.deepEqual(await asyncABC(), ['a', 'b', 'c']);
// });

test('Event Store should replay events on aggregate', (t) => {
  //   const agg = new CustomerAggregate();
  //   const streamId = '1234567';
  //   agg.createCustomer({
  //     StreamId: streamId,
  //     email: 'elijahbate@gmail.com',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     mobile: '0400123124',
  //   });

  //   t.assert(agg.getUncommittedEvents().length == 1, 'Missing uncommitted events');

  const customerCreate = new CustomerCreated(
    '1234567',
    'john',
    'doe',
    'email@domain.com',
    '0421123123'
  );

  const es = new InMemoryEventStore();
  es.SaveEvents([
    {
      TimeStamp: '11111111',
      Version: 1,
      Type: customerCreate.Type,
      Event: customerCreate,
    },
  ]);

  const agg = es.Get('1234567', new CustomerAggregate());

  t.assert(
    agg.Version === 1,
    'Event Store not applying event stores to aggregate or not incrementing version'
  );
  t.assert(
    agg.StreamId === '1234567',
    'Event Store not setting aggregate Id correctly'
  );
});
