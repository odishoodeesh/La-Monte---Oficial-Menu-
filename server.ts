import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Feedback
  app.post("/api/feedback", async (req, res) => {
    const { feedback, name } = req.body;
    
    if (!feedback) {
      return res.status(400).json({ error: "Feedback is required" });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram configuration");
      return res.status(500).json({ error: "Telegram service not configured" });
    }

    const message = `
🌟 *New Feedback Received* 🌟

👤 *Name:* ${name || "Anonymous"}
📝 *Message:*
${feedback}
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Telegram error:", errorData);
        throw new Error("Failed to send message to Telegram");
      }

      res.status(200).json({ success: true, message: "Feedback sent successfully" });
    } catch (error) {
      console.error("Error sending feedback:", error);
      res.status(500).json({ error: "Failed to send feedback" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
