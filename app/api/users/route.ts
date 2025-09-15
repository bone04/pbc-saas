    // pages/api/users.js
    import clientPromise from '@/lib/mongodb';

    export default async function handler(req, res) {
      try {
        const client = await clientPromise;
        const db = client.db('your_database_name'); // Replace with your database name

        if (req.method === 'GET') {
          const users = await db.collection('users').find({}).toArray();
          res.status(200).json(users);
        } else if (req.method === 'POST') {
          const { name, email } = req.body;
          const result = await db.collection('users').insertOne({ name, email });
          res.status(201).json(result.ops[0]);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }