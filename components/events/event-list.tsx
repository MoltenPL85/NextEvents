import { Event } from '../../interfaces';
import EventItem from './event-item';

import classes from './event-list.module.css';

interface EventListProps {
  events?: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events?.map((event) => (
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
