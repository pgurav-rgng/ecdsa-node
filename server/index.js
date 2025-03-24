const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03bede6f9a51cdff85a92bcc4492856305a37cc89020441d958ff93f3b3b266374": 100,
  "02a401d4fc17cb49fec3a24ab822d5791971303060f22f97091d74ade7df4f3193": 50,
  "032bc91f7b0174dff66a405b833ae87d5ba5151c398f1f4381f3fadf6639cb29a9": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TODO: Get a signature from the client and verify it
  //recover the public key from the signature
  //use the public key as the sender below
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
