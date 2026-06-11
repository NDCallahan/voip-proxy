import express from "express";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

const app = express();

// Accept raw text bodies (Activepieces sends raw text)
app.use(express.text({ type: "*/*" }));

app.post('/voip', async (req, res) => {
    try {
        // Convert the incoming request body into a URL-encoded string format
        const params = new URLSearchParams(req.body).toString();

        // Append ?api_status=json to force VoIP.ms to return JSON data instead of XML
        const response = await axios.post('https://voip.ms/api/v1/server.php?api_status=json', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to communicate with VoIP.ms', details: error.message });
    }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
