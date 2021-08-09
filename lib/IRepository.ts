
export interface IAggregate{
    Version: number;
    StreamId: string
}

export interface IAggregateCommit{

}

export interface IRepository{
    Get<TAggregate extends IAggregate>( id:string) :TAggregate

    Get(type:string,  id:string): IAggregate

    GetStateless( type:string,  id:string): IAggregate

    Save<TAggregate extends IAggregate>(aggregate: TAggregate): IAggregateCommit
}