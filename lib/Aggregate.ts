interface IMessage{
    StreamId: string
}

export interface IEvent extends IMessage{}
export interface ICommand extends IMessage{}


export type EventData = {    
    Type:string,
    Event: IEvent,
    TimeStamp: string,
    Version: number
}


export interface IHandleCommand<TCommand extends ICommand>{
    Handle(msg:TCommand): void;
}


export class Aggregate 
{
    private _id:string;
    private _version: number = 0;
    
    private _uncommittedEvents: Array<EventData>;

    get Id(): string{
        return this._id;
    }

    private set Id(value:string){
        this._id = value;
    }

    get Version(): number {
        return this._version;
    }

    private set Version(value:number){
        this._version = value;
    }


    public Raise<TEvent extends IEvent, TCommand extends ICommand & TEvent>(msg: TCommand) {
        const type="";


        this.Apply(msg);
        this._uncommittedEvents.push({Type: type, Event: msg, TimeStamp: new Date().toDateString(), Version: this._version});

    }

    public RaiseEvent<TEvent extends IEvent>(evt: TEvent){
        const type="";

        this.Apply(evt);
        this._uncommittedEvents.push({Type: type, Event: evt, TimeStamp: new Date().toDateString(), Version: this._version});
    }

    public RaiseStateless<TEvent extends IEvent>(msg: TEvent){
        const type="";


        this._version++;
        this._uncommittedEvents.push({Type: type, Event: msg, TimeStamp: new Date().toDateString(), Version: this._version});
    }


    public GetUncommittedEvents() : EventData[]
    {
        return  this._uncommittedEvents;
    }

    public ClearUncommittedEvents()
    {
        this._uncommittedEvents.splice(0,this._uncommittedEvents.length)
    }

    
    private Apply<TEvent extends IEvent>(evt: TEvent ){

        // Apply state mutations

        this._version++;
    }


    public SetState(id:string, version: number = 0)
    {
        this.Id = id;
        if (this.Version != 0)
        {
            this.Version = version;
        }
    }
}