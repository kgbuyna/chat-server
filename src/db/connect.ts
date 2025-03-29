import mongoose from "mongoose";
import { createClient } from "redis";


const assertRedisConnectionOk = async () => {
    try {
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        console.log("Redis connected");
        return client
    }
    catch (error) {
        console.error("Error connecting to Redis: ", error);
    }
}

const assertDatabaseConnectionOk = async ()=> {
    try {
        console.log("CONNECTING TO DB");
        await mongoose.connect(process.env.MONGOURI!);
        console.log("CONNECTED TO DB");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
};

export { assertDatabaseConnectionOk, assertRedisConnectionOk };