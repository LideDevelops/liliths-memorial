import { MongoClient, ObjectId, WithId, Document } from 'mongodb';
import { BlogEntries, BlogEntry } from './definitions';

// Get the collection name from the environment variable
const collectionName = process.env.BLOG_COLLECTION ?? "";

// Get the database connection string from the environment variable
const connectionString = process.env.MONGODB_URI ?? "";

// Create a function to connect to the MongoDB database
async function connectToDatabase() {
    try {
        // Connect to the database
        const client = await MongoClient.connect(connectionString);

        // Access the specified database
        const db = client.db("liliths-memorial");

        // Access the specified collection
        const collection = db.collection(collectionName);

        // Return the collection
        return collection;
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        throw error;
    }
}

export async function getBlogEntries(): Promise<BlogEntries> {
    try {
        // Connect to the database
        const collection = await connectToDatabase();

        // Get all blog entries
        const blogEntries = await collection.find().toArray();

        // Return the blog entries
        return MapToBlogEntries(blogEntries);
    } catch (error) {
        console.error('Failed to get blog entries:', error);
        throw error;
    }
}

export async function getBlogEntryByTitle(title: string): Promise<BlogEntry> {
    try {
        // Connect to the database
        const collection = await connectToDatabase();

        // Find the blog entry with the specified title
        const blogEntry = await collection.findOne({ title });

        // Return the blog entry
        return MapToBlogEntry(blogEntry);
    } catch (error) {
        console.error('Failed to get blog entry by title:', error);
        throw error;
    }
}

export async function getBlogEntryById(id: ObjectId): Promise<BlogEntry> {
    try {
        // Connect to the database
        const collection = await connectToDatabase();

        // Find the blog entry with the specified id
        const blogEntry = await collection.findOne({ _id: id });

        // Return the blog entry
        return MapToBlogEntry(blogEntry);
    } catch (error) {
        console.error('Failed to get blog entry by id:', error);
        throw error;
    }
}

export async function getBlogEntriesWithPagination(take: number, skip: number): Promise<BlogEntries> {
    try {
        // Connect to the database
        const collection = await connectToDatabase();

        // Get n blog entries, skipping m entries, ordered by date
        const blogEntries = await collection.find().skip(skip).limit(take).sort({ date: 1 }).toArray();

        // Return the blog entries
        // Map the blog entries to BlogEntry type
        const mappedBlogEntries: BlogEntries = MapToBlogEntries(blogEntries);

        // Return the mapped blog entries
        return mappedBlogEntries;
    } catch (error) {
        console.error('Failed to get blog entries with pagination:', error);
        throw error;
    }
}


function MapToBlogEntry(entry: WithId<Document> | null): BlogEntry {
    if (!entry) {
        return {
            id: "",
            title: "",
            content: "",
            thumbnail: "",
            date: new Date()
            };
    }
    return {
        id: entry._id.toString(),
        title: entry.title,
        content: entry.content,
        thumbnail: entry.thumbnail,
        date: entry.date
    };
}

function MapToBlogEntries(blogEntries: WithId<Document>[]): BlogEntries {
    return blogEntries.map(MapToBlogEntry);
}


export async function createBlogEntry(blogEntry: BlogEntry) {
    try {
        // Connect to the database
        const collection = await connectToDatabase();

        // Insert the new blog entry
        const result = await collection.insertOne(blogEntry);

        // Return the result
        return result;
    } catch (error) {
        console.error('Failed to create blog entry:', error);
        throw error;
    }
}
