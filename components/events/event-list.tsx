import { DummyEvent } from '../../dummy-data';
import EventItem from './event-item';

import classes from './event-list.module.css';

interface EventListProps {
  events: DummyEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const {} = events;
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
};

export default EventList;
