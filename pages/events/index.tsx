import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../heplers/api-util';
import { Event } from '../../interfaces';

interface AllEventsPageProps {
  events: Event[];
}

const AllEventsPage = ({ events }: AllEventsPageProps) => {
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events allow you to evolve..."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
