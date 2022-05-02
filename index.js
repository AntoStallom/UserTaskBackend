const http = require("http");
const app = require("./app");
// require('dotenv').config({ path: __dirname + '\\.env' }) //windows
// require('dotenv').config({ path: __dirname + '//.env' }) //mac

const port = process.env.PORT || 8080;
// console.log('jwt', process.env.MONGODB_CONNECTON_PWD)

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`local server started on http://localhost:${port}`);
});
