import { Event, EventData, IEvent } from './Event';
import { IAggregate } from './IRepository';

// TODO: Remove if we won't use due to ts type system limitations
// export interface IHandleCommand<TCommand extends ICommand> {
//   handle(msg: TCommand): void;
// }

export type ApplyEventHandler<TEvent extends IEvent> = (evt: TEvent) => void;

export type GenericApplyEventHandler = (evt: IEvent) => void;

export abstract class BaseAggregate<TAggregateEventTypes extends string>
  implements IAggregate
{
  private _id: string;
  private _version: number = 0;
  private _uncommittedEvents: Array<EventData> = [];

  private _applyEventHandlers: Map<string, GenericApplyEventHandler> = new Map<
    string,
    GenericApplyEventHandler
  >();

  get StreamId(): string {
    return this._id;
  }

  private set StreamId(value: string) {
    this._id = value;
  }

  get Version(): number {
    return this._version;
  }

  private set Version(value: number) {
    this._version = value;
  }

  get Exists(): boolean {
    return this.Version > 0;
  }

  public raise<TEvent extends Event<TAggregateEventTypes>>(msg: TEvent) {
    this.applyEvent(msg);
    this._uncommittedEvents.push({
      Type: msg.Type,
      Event: msg,
      TimeStamp: new Date().toDateString(),
      Version: this._version,
    });
  }

  public raiseEvent<TEvent extends Event<TAggregateEventTypes>>(evt: TEvent) {
    const type = '';

    this.applyEvent(evt);
    this._uncommittedEvents.push({
      Type: type,
      Event: evt,
      TimeStamp: new Date().toDateString(),
      Version: this._version,
    });
  }

  public raiseStateless<TEvent extends Event<TAggregateEventTypes>>(
    msg: TEvent
  ) {
    const type = '';

    this._version++;
    this._uncommittedEvents.push({
      Type: type,
      Event: msg,
      TimeStamp: new Date().toDateString(),
      Version: this._version,
    });
  }

  public setState(id: string, version?: number) {
    this.StreamId = id;
    if (version && version != 0) {
      this.Version = version;
    }
  }

  public getUncommittedEvents(): EventData[] {
    return this._uncommittedEvents;
  }

  public clearUncommittedEvents() {
    this._uncommittedEvents.splice(0, this._uncommittedEvents.length);
  }

  protected on<TEvent extends Event<TAggregateEventTypes>>(
    type: TAggregateEventTypes,
    handler: ApplyEventHandler<TEvent>
  ) {
    const eventTypeName = type;

    this._applyEventHandlers.set(eventTypeName, handler);
  }

  public applyEvent<TEvent extends Event<string>>(evt: TEvent) {
    const handler = this._applyEventHandlers.get(
      evt.Type
    ) as any as ApplyEventHandler<TEvent>;

    if (handler) {
      handler(evt);
    } else {
      if (process.env.NODE_ENV !== 'Production') {
        throw new Error('No handler found for event');
      }
    }

    this._version++;
  }
}
