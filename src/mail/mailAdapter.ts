export interface IMailAdapter {
  subject: string;
  body: string;
}

export interface ISendMailAdapter {
  sendMail: (data: IMailAdapter) => Promise<void>;
}