import mongoose, { Mongoose } from 'mongoose';


const MONGODB_URL = process.env.MONGODB_URL;

// Definition of an interface to type-check and manage a Mongoose connection and promise.
interface MongooseConnection {
    conn: Mongoose | null; // This will store the active Mongoose connection or null if not connected.
    promise: Promise<Mongoose> | null; // This will store the promise of a Mongoose connection or null if no promise has been made.
}

// Initialize a variable to cache the database connection to reuse the connection across multiple calls,
// improving performance by avoiding repeated connections to the database.
let cached: MongooseConnection = (global as any).mongoose;

// Check if the cache is not initialized, if so, initialize it.
if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, // Initially, there is no connection.
        promise: null // Initially, there is no promise of a connection.
    };
}

// Function to establish a connection to the MongoDB database.
export const connectToDatabase = async () => {
    // If a connection already exists in cache, return it directly to reuse the existing connection.
    if (cached.conn) {
        return cached.conn;
    }

    // If the MongoDB connection URL is not available in the environment variables, throw an error.
    if (!MONGODB_URL) {
        throw new Error('Missing MONGODB_URL');
    }

    // If there is no ongoing connection promise, create a new connection promise.
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: "pixigen", // Explicitly specifying the database name to connect to.
        bufferCommands: false // Disables mongoose buffering, commands will fail if not connected.
    });

    // Wait for the connection promise to resolve and store the resolved connection in the cache.
    cached.conn = await cached.promise;

    // Return the active database connection.
    return cached.conn;
}
