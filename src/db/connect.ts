import { Sequelize } from "sequelize";

const sequelizer = new Sequelize("chat-app","postgres", process.env.PG_PASSWORD, {
    dialect: "postgres",  
    host: "localhost"
});

const assertDatabaseConnectionOk = async ()=> {
    console.log(`Checking database connection...`);
    try {
        await sequelizer.authenticate();
        await sequelizer.sync({ alter: true});
        console.log("Database connection OK!");
    } catch (error) {
        console.log("Unable to connect to the database:");
        console.log(error)
        process.exit(1);
    }
};

export { sequelizer, assertDatabaseConnectionOk };