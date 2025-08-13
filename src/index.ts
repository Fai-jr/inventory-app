import { rateLimit } from "express-rate-limit";
import express from "express";
import customerRouter from "./routes/customer";
import userRouter from "./routes/user";
import shopRouter from "./routes/shop";
import supplierRouter from "./routes/supplier";
import loginRouter from "./routes/login";
import unitRouter from "./routes/unit";
import brandRouter from "./routes/brand";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import saleRouter from "./routes/sale";
import payeeRouter from "./routes/payee";
import ExpenseCategoryRouter from "./routes/expense-cat";
import expenseRouter from "./routes/expense";
import { error } from "console";
import notificationRouter from "./routes/notification";
import adjustmentRouter from "./routes/adjustment";
import purchaseRouter from "./routes/purchase";


require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

// Configure general rate limiter Middleware
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
   handler: (req, res) =>{
    res.status(429).json({
      error:"Too many requests, please try again later.",
    })
  }
});

// Apply general rate limiter to all requests
app.use(generalLimiter);

// Configure stricter rate limiter for sensitive operations
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>{
    res.status(429).json({
      error:"Too many requests, please try again later.",
    })
  }
});

app.use("/api/v1/sales", strictLimiter);
app.use("/api/v1/users", strictLimiter);
app.use("/api/v1/auth", strictLimiter);

app.use(express.json());
app.listen(PORT, () => {
  // Start the server and listen on the specified port
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});

app.use("/api/v1", customerRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", shopRouter)
app.use("/api/v1", supplierRouter)
app.use("/api/v1", loginRouter)
app.use("/api/v1", unitRouter)
app.use("/api/v1", brandRouter)
app.use("/api/v1", categoryRouter)
app.use("/api/v1", productRouter)
app.use("/api/v1", saleRouter)
app.use("/api/v1", payeeRouter)
app.use("/api/v1", ExpenseCategoryRouter)
app.use("/api/v1", expenseRouter)
app.use("/api/v1", notificationRouter)
app.use("/api/v1", adjustmentRouter)
app.use("/api/v1", purchaseRouter)

