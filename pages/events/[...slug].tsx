import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../heplers/api-util';
import { Event } from '../../interfaces';

interface FilteredEventsPageProps {
  events: Event[];
  hasError: boolean;
  numDate: { year: number; month: number };
}

const FilteredEventsPage = ({
  hasError,
  events: filteredEvents,
  numDate,
}: FilteredEventsPageProps) => {
  const router = useRouter();

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const { year: numYear, month: numMonth } = numDate;
  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const filterData = params?.slug;

  if (filterData) {
    const numYear = +filterData[0];
    const numMonth = +filterData[1];

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
    ) {
      return {
        props: { hasError: true },
        // notFound: true,
        // redirect: {
        //   destination: '/error'
        // }
      };
    }

    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });

    return {
      props: {
        events: filteredEvents,
        numDate: {
          year: numYear,
          month: numMonth,
        },
      },
    };
  }

  return {
    props: {
      props: { hasError: true },
    },
  };
};

export default FilteredEventsPage;
