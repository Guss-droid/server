import express from "express";

import { NodemailerMail } from "./mail/nodemailer/nodemailerMail";
import { SubmitFeedbackUseCase } from "./useCases/submitFeedbackUseCase";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { comment, type, screenshot } = req.body

  const nodemailerMail = new NodemailerMail()
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMail
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).json()
})