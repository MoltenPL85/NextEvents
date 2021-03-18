import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../heplers/api-util';
import { Event } from '../interfaces';

type HomePageProps = {
  events?: Event[];
};

const HomePage = ({ events }: HomePageProps) => {
  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
};

export default HomePage;
