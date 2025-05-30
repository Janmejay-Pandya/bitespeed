
import express from "express";
import { json } from "body-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swaggerConfig";
import identifyRoutes from "./routes/identifyRoute";

const app = express();
app.use(json());

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 👈 Swagger route
app.use("/identify", identifyRoutes);
app.get("/", (req, res) => {
  res.redirect("/api");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
