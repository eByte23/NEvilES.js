import { EventData } from "../Aggregate";
import { IAggregate, IAggregateCommit, IRepository } from "../IRepository";




export class InMemoryEventStore implements IRepository{
    private _events: Array<EventData> = [];


    Get<TAggregate extends IAggregate>(id: string): TAggregate{
        

        throw new Error("Method not implemented.");
    }
    // Get(type: string, id: string): IAggregate{
    //     throw new Error("Method not implemented.");
    // }
    GetStateless(type: string, id: string): IAggregate {
        throw new Error("Method not implemented.");
    }
    Save<TAggregate extends IAggregate>(aggregate: TAggregate): IAggregateCommit {
        throw new Error("Method not implemented.");
    }

}


// public TAggregate Get<TAggregate>(Guid id) where TAggregate : IAggregate

// public IAggregate Get(Type type, Guid id)

// public IAggregate GetStateless(Type type, Guid id)

// IAggregateCommit Save(IAggregate aggregate)
// {
//     if (aggregate.Id == Guid.Empty)
//     {
//         throw new Exception($"The aggregate {aggregate.GetType().FullName} has tried to be saved with an empty id");
//     }

//     var uncommittedEvents = aggregate.GetUncommittedEvents().Cast<IEventData>().ToArray();
//     var count = 0;

//     List<EventDb> events;
//     if (!eventData.TryGetValue(aggregate.Id, out events))
//     {
//         events = new List<EventDb>();
//         eventData.Add(aggregate.Id, events);
//     }
//     foreach (var uncommittedEvent in uncommittedEvents)
//     {
//         var version = aggregate.Version - uncommittedEvents.Length + count + 1;
//         var dbEvent = new EventDb()
//         {
//             Id = version,
//             StreamId = aggregate.Id,
//             Body = JsonConvert.SerializeObject(uncommittedEvent.Event, SerializerSettings),
//             Category = aggregate.GetType().FullName,
//             BodyType = uncommittedEvent.Type,
//             Version = version,
//         };

//         events.Add(dbEvent);
//         count++;
//     }

//     aggregate.ClearUncommittedEvents();
//     return new AggregateCommit(aggregate.Id, Guid.Empty, "", uncommittedEvents);
// }