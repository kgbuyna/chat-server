import mongoose from "mongoose";

const assertDatabaseConnectionOk = async ()=> {
    try {
        console.log("CONNECTING TO DB");
        await mongoose.connect(process.env.MONGOURI!);
        console.log("CONNECTED TO DB");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
};

export { assertDatabaseConnectionOk };