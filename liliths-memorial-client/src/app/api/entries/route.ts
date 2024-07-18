import { PageEntry } from "@/lib/definitions";
import { MongoClient } from "mongodb";
import Joi from 'joi';
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {

    const client = new MongoClient(process.env.MONGODB_URI ?? "", {
    });
    try {
        await client.connect();

        // Choose a name for your database
        const database = client.db("liliths-memorial");

        // Choose a name for your collection
        const collection = database.collection("homepage-articles");
        const allData = await collection.find({}).toArray();
        return Response.json(allData);
    } catch (error) {
        return Response.json({ message: "Something went wrong!" });
    } 
}

// Define the PageEntry schema
const pageEntrySchema = Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    desiredIndex: Joi.number().optional()
  });

  function isPageEntry(obj: any): boolean {
    const { error } = pageEntrySchema.validate(obj);
    return !error; // If there's no error, the object matches the PageEntry schema
  }

export async function POST(request: Request) {
    const session = await auth();
    if(!session?.user) {
        return new Response("Unauthorized", { status: 401 });
    }
    const client = new MongoClient(process.env.MONGODB_URI ?? "", {
    });

    try {
        await client.connect();

        // Choose a name for your database
        const database = client.db("liliths-memorial");

        // Choose a name for your collection
        const collection = database.collection("homepage-articles");
        const dataToInsert = await request.json();
        if(!isPageEntry(dataToInsert)) {
            return new Response("Invalid data! " + JSON.stringify(dataToInsert), { status: 400 });;
        }
        if(!dataToInsert.desiredIndex || dataToInsert.desiredIndex < 0) {
            const index = await collection.find().sort({desiredIndex: -1}).limit(1).toArray();
            dataToInsert.desiredIndex = index[0].desiredIndex + 1;
        }
        await collection.insertOne(dataToInsert);
        revalidateTag('homepage');
        return new Response(null, { status: 201 });
    } catch (error) {
        return new Response("Something went wrong!", { status: 500 });
    }
}