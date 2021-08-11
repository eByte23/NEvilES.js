# NEvilES.js
An Event Sourcing library for javascript base on the principles and data models used in https://github.com/CRGCode/NEvilES

## Get Started

Here are the main things you need to know

Coming from c# and NEvilES there are a few differences and I have had to work around type system limitations in typescript


Here is how we define our aggregates, commands and events
```ts
// import what we need from the library
import { BaseAggregate, Event, ICommand } from './Aggregate';
// We must also pass all the Event Types we raise/emit from the aggregate.

// Event Type Definition
export type CustomerEventTypes =
  | 'customer.customer_created'
  | 'customer.mobile_number_changed';

// Define our command as a type or interface.
// take note we are using readonly here from properties but this isn't required
type CreateCustomerCommand = ICommand & {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly mobile: string;
};


// Defining our event
export class CustomerCreated extends Event<CustomerEventTypes> {
  constructor(
    streamId: string,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string
  ) {
    // This first parameter is our event type from our `CustomerEventTypes` definition
    // this is required for every event
    super('customer.customer_created', streamId);

    this.FirstName = firstName;
    this.LastName = lastName;
    this.Email = email;
    this.Mobile = mobile;
  }

  public readonly FirstName: string;
  public readonly LastName: string;
  public readonly Email: string;
  public readonly Mobile: string;
}


// Our Aggrgeates should extend(inherit) BaseAggregate<T>

export class CustomerAggregate extends BaseAggregate<CustomerEventTypes> {
  constructor() {
    super();

    // We setup or `apply` functions to apply internal state
    // manipulations to our aggregate.
    // These get re-run on fetch of aggregate.
    this.on<CustomerCreated>('customer.customer_created', (e) =>
      this.customerCreated(e)
    );
  }
  
  // Our aggregate internal state.
  // We may use this later to onfirm a customers current email address when changing it
  private email: string;

  // We define our handler method here.
  public createCustomer(msg: CreateCustomerCommand): void {
    if (this.Exists) {
      throw new Error(`A customer with Id: ${msg.StreamId} already exists`);
    }

    // We raise our event here!
    this.raise(
      new CustomerCreated(
        msg.StreamId,
        msg.firstName,
        msg.lastName,
        msg.email,
        msg.mobile
      )
    );
  }

  // Apply method.
  private customerCreated(evt: CustomerCreated): void {
    this.email = evt.Email;
  }

}

```


Getting up and running.

```ts
// First we need an event store instance
// we will start with no events in the store
const es = new InMemoryEventStore();

const streamId = '04e9aba2-ac45-4b9d-b7b7-5f0163faa0d7'; // we create some form of id most liekly a guid/uuid

// Now we could skip this step if we are sure it is a new aggregate/stream
// and handle the check when saving in the eventstore
// That option would look like
const agg = new CustomerAggreate();
agg.setState(streamId);

// otherwise I would lean towards this always for a consistent pattern
const agg = es.Get(streamId, new CustomerAggregate());

// As we use an interface or type def for the command we can
// just pass an object with a matching signature
agg.createCustomer({
    StreamId: streamId,
    FirstName: 'john',
    LastName: 'doe',
    Email: 'email@domain.com',
    Mobile: '0421123123'
});

// The above would run the logic in the handler, run apply methods for the event and save the event in the aggrate to be commited to the store.

// something like this
es.Save(agg);
```



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
