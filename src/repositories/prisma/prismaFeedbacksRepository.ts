import { prisma } from "../../prisma";

import { IFeedbackCreateData, IFeedbacksRepository } from "../feedbacksRepository";

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  async create({ comment, type, screenshot }: IFeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}