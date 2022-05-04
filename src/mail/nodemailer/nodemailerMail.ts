import { transport } from "../../nodemailer";

import { IMailAdapter, ISendMailAdapter } from "../mailAdapter";

export class NodemailerMail implements ISendMailAdapter {
  async sendMail({subject, body}: IMailAdapter) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Gustavo Ré <gu@gmail.com>",
      subject,
      html: body
    })
  }
}