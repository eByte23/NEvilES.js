// import { Aggregate, ICommand ,IEvent,IHandleCommand} from "lib/Aggregate";

// interface CreateCustomerCommand extends ICommand{
//     firstName: string
//     lastName: string
//     email: string
// }

// interface CustomerCreated extends IEvent{
//     firstName: string
//     lastName: string
//     email: string
// }

// // export type CustomerEventTypes =

// class CustomerAggregate extends Aggregate implements
//     IHandleCommand<CreateCustomerCommand>
// {
//     constructor(){
//         super();

//         this.On<CustomerCreated>(this.Apply);

//     }

//     private firstName: string;
//     private lastName: string;
//     private email: string;

//     public Handle(msg: CreateCustomerCommand): void {
//         throw new Error("Method not implemented.");
//     }

//     private Apply(evt:CustomerCreated): void{
//         this.firstName = evt.firstName;
//         this.lastName = evt.lastName;
//         this.email = evt.email;
//     }
// }

// const agg = new CustomerAggregate();

// agg.SetState("abc",0);
// agg.Handle({
//     StreamId:"abc",
//     email:"abcd@gmail.com",
//     firstName:"john",
//     lastName:"Doe"
// })
