import express from "express";
import { configDotenv } from "dotenv";
import connection from "./config/db.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import socketServer from "./socket/socketServer.js"; // assuming it's a default export
import authRoutes from "./routes/authRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

configDotenv(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend Do Dash concept");
});

app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/admin", adminRoutes);
// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Start DB & Server
const startServer = async () => {
  try {
    await connection(); // Connect to MongoDB using your db.js
    console.log("✅ MongoDB Connected");

    // Initialize socket server
    socketServer(io); // Setup your real-time handlers

    server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
