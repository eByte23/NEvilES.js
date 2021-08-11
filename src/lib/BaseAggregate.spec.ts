import test from 'ava';

import { BaseAggregate } from './BaseAggregate';
import { Event } from './Event';
import { ICommand } from './IMessage';

test('Ensure events are are raised and applied to aggregate', (t) => {
  const agg = new CustomerAggregate();
  const streamId = '1234567';
  agg.createCustomer({
    StreamId: streamId,
    email: 'elijahbate@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    mobile: '0400123124',
  });

  t.assert(
    agg.getUncommittedEvents().length == 1,
    'Missing uncommitted events'
  );

  agg.changeCustomerMobile({
    StreamId: streamId,
    mobile: '0423123123',
  });

  t.assert(
    agg.getUncommittedEvents().length == 2,
    'Missing uncommitted events'
  );
});

type CreateCustomerCommand = ICommand & {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly mobile: string;
};

export class CustomerCreated extends Event<CustomerEventTypes> {
  constructor(
    streamId: string,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string
  ) {
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

interface ChangeCustomerMobile extends ICommand {
  mobile: string;
}

export class CustomerChangedMobileNumber extends Event<CustomerEventTypes> {
  constructor(streamId: string, mobile: string) {
    super('customer.mobile_number_changed', streamId);
    this.Mobile = mobile;
  }

  public Mobile: string;
}

export type CustomerEventTypes =
  | 'customer.customer_created'
  | 'customer.mobile_number_changed';

export class CustomerAggregate extends BaseAggregate<CustomerEventTypes> {
  constructor() {
    super();

    this.on<CustomerCreated>('customer.customer_created', (e) =>
      this.customerCreated(e)
    );
    this.on<CustomerCreated>('customer.mobile_number_changed', (e) =>
      this.customerNumberChanged(e)
    );
  }

  private email: string;

  public createCustomer(msg: CreateCustomerCommand): void {
    if (this.Exists) {
      throw new Error(`A customer with Id: ${msg.StreamId} already exists`);
    }

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

  public changeCustomerMobile(msg: ChangeCustomerMobile): void {
    if (!this.Exists) {
      throw new Error(`A customer with Id: ${msg.StreamId} doesn't exist`);
    }

    if (this.email == '') {
      console.log('abc');
    }

    this.raise(new CustomerChangedMobileNumber(msg.StreamId, msg.mobile));
  }

  private customerCreated(evt: CustomerCreated): void {
    this.email = evt.Email;
  }

  private customerNumberChanged(evt: CustomerChangedMobileNumber): void {
    this.email = evt.Mobile;
  }
}
