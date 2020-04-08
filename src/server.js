import { Server, Response } from "miragejs";
const makeServer = () => {
  return new Server({
    urlPrefix: "http://localhost:8000/",

    routes() {
      this.post("http://localhost:8000/resume", (schema, request) => {
        console.log(request.data);
        return new Response(201);
      });

      this.get("http://localhost:8000/groups/:groupId", () => {
        return {
          id: 1,
          name: "Group 1",
          description: "This is our event group",
          candidates: [
            {
              id: 2,
              email: "email@example.com",
              first_name: "Mohit",
              last_name: "Khattar"
            },
            {
              id: 3,
              email: "email@email.com",
              first_name: "New",
              last_name: "User"
            }
          ]
        };
      });
    }
  });
};

export default makeServer;
