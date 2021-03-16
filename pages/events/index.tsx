import { useRouter } from 'next/dist/client/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../dummy-data';

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
};

export default AllEventsPage;
