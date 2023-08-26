//vendors
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
//components
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// this always runs on server side
export async function getStaticProps() {
  //   fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://shyam041:Password786@cluster0.zvacp3l.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        const { _id, data } = meetup;
        return {
          id: _id.toString(),
          ...data,
        };
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
