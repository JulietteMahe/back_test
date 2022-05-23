const connection = require("./db-config");
const express = require("express"); // ok importe le paquet express
const app = express(); // créé l'app express 

const cors = require("cors");

const router = require("./routes/index.routes");

const port = process.env.PORT || 6300;

/*const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};*/

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*app.use(cors(corsOptions));*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", router);

//  Ecoute la méthode GET et la route "/"
app.get("/", async (req, res) => {
  res.send("Welcome");
});

// Démarrer le serveur et écouter un port donné
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;