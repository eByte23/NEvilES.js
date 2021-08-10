# NEvilES.js
An Event Sourcing library for javascript base on the principles and data models used in https://github.com/CRGCode/NEvilES

## Get Started

Here are the main things you need to know

### Commands 


### Events


### Event Store
This is where we read and write and store our events with abstractions for different storage methods e.g. MySQL, DynamoDB, PostgreSQL etc...

### Aggregates
This is where our business logic should lie and where we arange our commands and events.


sudo code for our example

```ts
const repository = new InMemoryEventRepository();
const eventStore = new EventStore(repository);

const aggregate = (new Aggregate(eventStore)).Get("abcde");

const aggregateCommit = aggreate.handle({
  type: 'create_customer',
  data:{
    id:'aaaa',
    name: 'Elijah Bate'
  }
});

eventStore.commit(aggregateCommit);


```
