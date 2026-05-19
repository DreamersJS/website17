import express from "express";
import {
  sendConfirmationEmailController,
  sendMsgController,
  checkDomainMxRecords,
  confirmEmail,
  isConfirmed,
} from "../controllers/emailController.js";
import { validateZod } from "../middleware/validateZod.js";
import { contactSchema, singleEmailSchema } from "../../../shared/schemas/email.schema.js";

const router = express.Router();

router.post("/checkDomain", validateZod(singleEmailSchema), checkDomainMxRecords);
router.post("/sendConfirmationEmail", validateZod(singleEmailSchema), sendConfirmationEmailController);
router.get("/confirmEmail", validateZod(singleEmailSchema, "query"), confirmEmail);
router.get("/isConfirmed", validateZod(singleEmailSchema, "query"), isConfirmed);
router.post("/sendMsg", validateZod(contactSchema), sendMsgController);

export default router;
