import { ISendMailAdapter } from "../mail/mailAdapter";
import { IFeedbacksRepository } from "../repositories/feedbacksRepository";

interface ISubmitFeedback {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: ISendMailAdapter,
  ) { }

  async execute(data: ISubmitFeedback) {
    const { comment, type, screenshot } = data

    if(screenshot && !screenshot.startsWith("data:image/png;base64,")) {
      throw new Error("Invalid screenshot format")
    }

    if(!type || !comment) {
      throw new Error("Invalid feedback")
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        "<div style='font-family: sans-serif; font-size: 16px; color: #111'>",
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        "</div>"
      ].join("\n")
    })
  }
}