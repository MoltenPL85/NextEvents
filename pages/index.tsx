import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../heplers/api-util';
import { Event } from '../interfaces';

type HomePageProps = {
  events?: Event[];
};

const HomePage = ({ events }: HomePageProps) => {
  return (
    <div>
      <Head>
        <title>Events</title>
        <meta
          name="description"
          content="Find a lot of great events allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
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
    revalidate: 1800,
  };
};

export default HomePage;
