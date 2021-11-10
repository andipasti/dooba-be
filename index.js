import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import usersRoutes from "./routes/users";
import apiDocsRoutes from './routes/api-docs'
import errorHandler from "./middlewares/errorHandler";
import { connectToDB } from "./databaseConnect";

const startServer = async () => {
  const app = express();

  dotenv.config();
  await connectToDB();

  app.use(express.json({ extended: true }));

  app.use(cors());

  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/', apiDocsRoutes);
  app.use(errorHandler);

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

startServer();