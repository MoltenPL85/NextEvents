import { NextApiRequest, NextApiResponse } from 'next';
import { CommentDataDB, CommentData } from '../../../interfaces';
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../heplers/db-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.eventId as string;

  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text }: CommentData = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment: CommentDataDB = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (err) {
      res.status(500).json({ message: 'Getting data failed!' });
    }
  }

  client.close();
};

export default handler;
