import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Server is listening");
});



app.use('/api',userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
      const statusCode = err.statusCode || 500;
      const message =err.message || 'Internal Server Error';

      res.status(statusCode).json({
            sucess:"false",
            statusCode,
            message
      });
});
