import { Server } from "miragejs";
const makeServer = () => {
  return new Server({
    urlPrefix: "https://localhost:8000/",

    routes() {
      this.get("/events/1", () => {
        return {
          name: "Hackathon #1",
          description: "This is the first hackathon we're running",
          startDatetime: new Date(),
          endDateTime: new Date()
        };
      });
    }
  });
};

export default makeServer;
