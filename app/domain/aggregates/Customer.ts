import { Aggregate, ICommand ,IHandleCommand} from "../../../lib/Aggregate";


interface CreateCustomerCommand extends ICommand{
    firstName: string
    lastName: string
    email: string
}





class CustomerAggregate extends Aggregate implements 
    IHandleCommand<CreateCustomerCommand>
{
    public Handle(msg: CreateCustomerCommand): void {
        throw new Error("Method not implemented.");
    }


}


const agg = new CustomerAggregate();

agg.SetState("abc",0);
agg.Handle({
    StreamId:"abc",
    email:"abcd@gmail.com",
    firstName:"john",
    lastName:"Doe"
})