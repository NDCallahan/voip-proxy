import express from "express";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

const app = express();
app.use(express.json());

app.post("/voip", async (req, res) => {
  try {
    const params = new URLSearchParams(req.body);

    const response = await fetch("https://voip.ms/api/v1/rest.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
