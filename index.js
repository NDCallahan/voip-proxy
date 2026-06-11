import express from "express";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

const app = express();

// Accept raw text bodies (Activepieces sends raw text)
app.use(express.text({ type: "*/*" }));

app.post("/voip", async (req, res) => {
  try {
    // req.body is a raw string like:
    // "api_username=...&api_password=...&method=getDIDsInfo"
    const params = new URLSearchParams(req.body);

    const response = await fetch("https://voip.ms/api/v1/rest.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });

    // VoIP.ms returns JSON when the request is correct
    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
