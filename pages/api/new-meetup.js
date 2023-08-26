// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://shyam041:Password786@cluster0.zvacp3l.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const results = await meetupsCollection.insertOne({ data });
    client.close();
    res.status(201).json({message: "Meetup inserted"});
  }
}

export default handler;
