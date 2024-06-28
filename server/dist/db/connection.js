import { connect, disconnect } from "mongoose";
export default async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("connect to database successfully");
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Connect to MONGODB Charter Chatter");
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Disconnect from MONGODB Charter Chatter");
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map