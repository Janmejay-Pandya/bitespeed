// // src/index.ts

// import express from "express";
// import identifyRoute from "./routes/identifyRoute";

// const app = express();
// app.use(express.json());

// app.use("/", identifyRoute);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from "express";
import { json } from "body-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swaggerConfig";
import identifyRoutes from "./routes/identifyRoute";

const app = express();
app.use(json());

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 👈 Swagger route
app.use("/identify", identifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
