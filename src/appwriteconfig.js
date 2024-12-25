import { Client, Account, Databases, Storage, ID, Messaging } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('lic'); // Your project ID

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const messaging = new Messaging(client); // Use Messaging for real-time

export { client, account, database, storage, messaging, ID }; // Export messaging
