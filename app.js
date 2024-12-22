const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from "public" directory

// Encryption endpoint
app.post("/encrypt", (req, res) => {
  const { message, key } = req.body;

  try {
    const iv = crypto.randomBytes(16); // Generate a random 16-byte IV
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
    let encrypted = cipher.update(message, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Prepend IV to the encrypted message (hex-encoded)
    const encryptedMessage = iv.toString("hex") + ":" + encrypted;
    res.json({ encrypted: encryptedMessage });
  } catch (err) {
    res.status(400).json({ error: "Encryption failed. Ensure the key is 32 bytes (64 hex characters)." });
  }
});

// Decryption endpoint
app.post("/decrypt", (req, res) => {
  const { encryptedMessage, key } = req.body;

  try {
    // Extract IV and encrypted data
    const [ivHex, encryptedHex] = encryptedMessage.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    res.json({ decrypted });
  } catch (err) {
    res.status(400).json({ error: "Decryption failed. Ensure the key and encrypted message are correct." });
  }
});

// Key generation endpoint
app.get("/generate-key", (req, res) => {
  const key = crypto.randomBytes(32).toString("hex"); // Generate 32-byte key (64 hex characters)
  res.json({ key });
});

// Start the server
const PORT = process.env || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

