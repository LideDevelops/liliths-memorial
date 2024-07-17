import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const client = new MongoClient(process.env.MONGODB_URI ?? "", {
        });

        try {
            await client.connect();

            // Choose a name for your database
            const database = client.db("liliths-memorial");

            // Choose a name for your collection
            const collection = database.collection("homepage-articles");
            const allData = await collection.find({}).toArray();

            res.status(200).json(allData);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong!" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}