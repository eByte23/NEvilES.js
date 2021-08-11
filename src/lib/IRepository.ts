import { Event } from './Event';

export interface IAggregate {
  readonly Version: number;
  readonly StreamId: string;
  setState(streamId: string, version?: number): void;
  applyEvent<TEvent extends Event<string>>(evt: TEvent): void;
}

// // export interface IAggregateCommit{

// // }

// export interface IRepository{
//     Get<TAggregate extends IAggregate>( id:string) :TAggregate

//     Get(type:string,  id:string): IAggregate

//     GetStateless( type:string,  id:string): IAggregate

//     Save<TAggregate extends IAggregate>(aggregate: TAggregate):void //IAggregateCommit
// }
