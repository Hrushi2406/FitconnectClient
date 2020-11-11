import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getToken } from "../utils/authorization";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),

  headers: {
    Authorization: getToken(),
  },
  //   headers :
});

client.config = {
  headers: {
    Authorization: "hrushi",
  },
};
export default client;
