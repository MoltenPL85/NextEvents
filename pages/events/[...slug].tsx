import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { Event } from '../../interfaces';

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    'https://nextevents-9d93c-default-rtdb.firebaseio.com/events.json'
  );

  useEffect(() => {
    if (data) {
      const events: Event[] = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  const numYear = filterData && +filterData[0];
  const numMonth = filterData && +filterData[1];

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      {!numYear || !numMonth ? (
        <meta name="description" content="List of filtered events" />
      ) : (
        <meta
          name="description"
          content={`All events for ${numMonth}/${numYear}.`}
        />
      )}
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  if (
    !numYear ||
    !numMonth ||
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
