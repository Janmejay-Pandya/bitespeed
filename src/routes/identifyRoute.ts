// // src/routes/identifyRoute.ts

// import express from "express";
// import { handleIdentify } from "../controllers/identifyController";

// const router = express.Router();

// router.post("/identify", handleIdentify);

// export default router;


import express from "express";
import {handleIdentify}  from "../controllers/identifyController";

const router = express.Router();

/**
 * @swagger
 * /identify:
 *   post:
 *     summary: Identify or create user based on email and/or phone
 *     tags: [Identify]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: sam@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: "9999999999"
 *     responses:
 *       200:
 *         description: Contact identification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   type: object
 *                   properties:
 *                     primaryContactId:
 *                       type: number
 *                     emails:
 *                       type: array
 *                       items:
 *                         type: string
 *                     phoneNumbers:
 *                       type: array
 *                       items:
 *                         type: string
 *                     secondaryContactIds:
 *                       type: array
 *                       items:
 *                         type: number
 *                     metadata:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           linkedId:
 *                             type: number
 *                             nullable: true
 *                           linkPrecedence:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                           deletedAt:
 *                             type: string
 *                             nullable: true
 */
router.post("/", handleIdentify);

export default router;
