// On the server, this sets up a MongoDB collection called activities; on the client, this creates a cache connected to the server collection.
import { Mongo } from 'meteor/mongo';

export const Interests = new Mongo.Collection('interests');
