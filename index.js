import express from "express";
import fetch from "node-fetch";

const app = express();

// Accept raw text bodies from Activepieces
app.use(express.text({ type: "*/*" }));

app.post('/voip', async (req, res) => {
    try {
        // Ensure we pass the raw text body cleanly to VoIP.ms
        const response = await fetch('https://voip.ms/api/v1/server.php?api_status=json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: req.body // req.body is already the raw URL-encoded string sent by Activepieces
        });

        // Parse and return the JSON response from VoIP.ms
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to communicate with VoIP.ms', details: error.message });
    }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
