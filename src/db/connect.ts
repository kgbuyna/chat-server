import mongoose from "mongoose";

const assertDatabaseConnectionOk = async ()=> {
    try {
        await mongoose.connect(process.env.MONGOURI!);
        console.log("connected to db");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
};

export { assertDatabaseConnectionOk };