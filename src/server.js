import { Server } from "miragejs";
const makeServer = () => {
  return new Server({
    urlPrefix: "http://localhost:8000/",

    routes() {},
  });
};

export default makeServer;
