import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const upload = multer({ dest: "public/" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/upload-logo", upload.single("logo"), async (req, res) => {
    try {
      let inputPath = "";
      let isTempFile = false;

      if (req.file) {
        inputPath = req.file.path;
        isTempFile = true;
      } else if (req.body.imageUrl) {
        // Download image from URL
        const response = await fetch(req.body.imageUrl);
        if (!response.ok) throw new Error("Failed to fetch image from URL");
        const buffer = await response.arrayBuffer();
        inputPath = path.join("public", "temp-downloaded-logo.jpg");
        fs.writeFileSync(inputPath, Buffer.from(buffer));
        isTempFile = true;
      } else {
        return res.status(400).json({ error: "No file or image URL provided" });
      }

      console.log(`Processing ${inputPath}...`);

      const { data, info } = await sharp(inputPath)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const { width, height, channels } = info;
      let minX = width, minY = height, maxX = 0, maxY = 0;

      // Make white pixels transparent and find bounding box
      for (let i = 0; i < data.length; i += channels) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is white or very close to white (tolerance)
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Set alpha to 0
        } else {
          // Not white, update bounding box
          const x = (i / channels) % width;
          const y = Math.floor((i / channels) / width);
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }

      if (minX > maxX || minY > maxY) {
        return res.status(400).json({ error: "Image is completely white or empty." });
      }

      // Crop to bounding box
      const cropWidth = maxX - minX + 1;
      const cropHeight = maxY - minY + 1;
      
      // Create a square
      const size = Math.max(cropWidth, cropHeight);
      const padding = Math.floor(size * 0.1); // 10% padding
      const finalSize = size + padding * 2;

      // First, save the cropped and transparent image
      const croppedBuffer = await sharp(data, {
        raw: { width, height, channels }
      })
        .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
        .png()
        .toBuffer();

      // Now create the final square image
      const finalBuffer = await sharp({
        create: {
          width: finalSize,
          height: finalSize,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
        .composite([{ input: croppedBuffer, gravity: 'center' }])
        .png()
        .toBuffer();

      // Save sizes
      const sizes = [1024, 512, 192, 144, 96, 72, 48];
      const outDir = path.resolve("public/icons");
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      for (const s of sizes) {
        await sharp(finalBuffer)
          .resize(s, s)
          .png()
          .toFile(path.join(outDir, `icon-${s}x${s}.png`));
        console.log(`Generated ${s}x${s}`);
      }

      // Save 1024x1024 as logo.png
      await sharp(finalBuffer)
        .resize(1024, 1024)
        .png()
        .toFile(path.resolve("public/logo.png"));
      
      // Delete the temp uploaded file
      if (isTempFile && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }

      res.json({ success: true, message: "Logo processed successfully!" });
    } catch (error: any) {
      console.error(error);
      fs.writeFileSync("error.log", String(error.stack || error));
      res.status(500).json({ error: "Failed to process logo: " + String(error.message || error) });
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
