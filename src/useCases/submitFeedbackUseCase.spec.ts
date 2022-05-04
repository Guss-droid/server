import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(submitFeedback.execute({
      type: "OTHER",
      comment: "create comments in the post",
      screenshot: "data:image/png;base64,My and moon kisses"
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it("should not be able to submit a feedback without type or comment", async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "create comments in the post",
      screenshot: "data:image/png;base64,My and moon kisses"
    })).rejects.toThrow()
  })

  it("should not be able to submit a feedback with invalid screenshot", async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "create comments in the post",
      screenshot: "My and moon kisses.png"
    })).rejects.toThrow()
  })
})