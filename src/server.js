import { Server } from "miragejs";
const makeServer = () => {
  return new Server({
    urlPrefix: "https://localhost:8000/",

    routes() {}
  });
};

export default makeServer;
