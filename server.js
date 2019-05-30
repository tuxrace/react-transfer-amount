const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  const connString =
    "mongodb://user:password1@ds263156.mlab.com:63156/transfers";
  mongoose.connect(connString, { useNewUrlParser: true });

  const transfersSchema = new mongoose.Schema({
    userName: String,
    paymentMode: String,
    amount: Number
  });

  const Transfer = mongoose.model("Transfer", transfersSchema);

  server.get("/api/transfers", async (req, res) => {
    const query = Transfer.find();

    const result = await query.exec();
    console.log(result);

    return res.json(result);
  });

  server.post("/api/transfers", async (req, res) => {
    const query = new Transfer(req.body);

    const result = await query.save();

    console.log(result);
    return res.json([{ status: "saved" }]);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
