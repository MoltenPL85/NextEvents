import { MongoClient, SortOptionObject } from 'mongodb';

type SortType = string | [string, number][] | SortOptionObject<any>;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.naz8h.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  return client;
};

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: Object
) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getAllDocuments = async (
  client: MongoClient,
  collection: string,
  sort: SortType,
  filter = {}
) => {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
};
