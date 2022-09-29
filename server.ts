import app from "./app";
import http from "http";
import config from "./src/utils/config";

const server = http.createServer(app);

/* 
  Check to make sure debugging processes 
  do not show up in Production.
  E.g. console.log()
*/
if (config.NODE_ENV === "production") {
  console.log = function () {};
  console.error = function () {};
}

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });

//Server Entry Point
server.listen(config.PORT, () => {
  const date = new Date();
  const serverConnectionObject: object = {
    type: "Server API Initialization",
    message: `Backend Server running on port ${config.PORT}`,
    date: date,
  };
  console.log(serverConnectionObject);
});
