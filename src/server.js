import { Server, Response } from "miragejs";
const makeServer = () => {
  return new Server({
    urlPrefix: "http://localhost:8000/",

    routes() {
      this.post("http://localhost:8000/resume", (schema, request) => {
        console.log(request.data);
        return new Response(201);
      });
    }
  });
};

export default makeServer;
