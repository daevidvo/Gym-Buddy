// modules
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");

// helpers
const helpers = require("./utils/helpers.js");

// sequelize connections
const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// network
const app = express();
const PORT = process.env.PORT || 3001;

// handlebars
const hbs = exphbs.create({ helpers });

// cookies
const sess = {
  secret: '";1:M59!ADe4z9*1XF1=',
  cookie: {
    maxAge: 3600000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// handlebars engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middlware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use(routes);

async function startServer() {
  await sequelize.sync({ force: false });
  const server = app.listen(PORT, () => console.log(`App listening on ${PORT}`));

  console.log(server);
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });
}

// socket
// const http = require('http').Server(app);

startServer();
