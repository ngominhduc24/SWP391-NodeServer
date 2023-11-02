const uri = "mongodb+srv://sa:123@swp391-g3.dp0phji.mongodb.net/?retryWrites=true&w=majority";

const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let dbConnection;
 
async function connectDb() {
    try {
        await client.connect();
        
        console.log("Connected DB");
        dbConnection = client.db("swp391");
        return true;

    } catch {
        console.log('DB connect failed');
        return false;
    }
}

async function insertOne(collectionName, data) {
    dbConnection.collection(collectionName).insertOne(data);
}

async function findOne(collectionName, data) {
    return await dbConnection.collection(collectionName).findOne(data);
}

async function updateOnePushMode(collectionName, condition, data) {
    await dbConnection.collection(collectionName).updateOne(
        condition, // The filter to find the document
        { $push: data }, // The update operation to add the new element
        (err, result) => {
            if (err) {
                console.error('updateOnePushMode: ', err);
            }
        }
    );
}

module.exports = {
    connectDb,
    insertOne,
    findOne,
    updateOnePushMode,
}