const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const aws = require('aws-sdk');

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const key = new aws.S3({
  accessKey: process.env.MONGODB
});
const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
