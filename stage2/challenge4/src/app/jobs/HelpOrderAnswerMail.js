import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.Student.name} <${helpOrder.Student.email}>`,
      subject: `Seu pedido de auxílio foi respondido!`,
      template: 'helpOrderAnswer',
      context: {
        question: helpOrder.question,
        questionDate: format(
          parseISO(helpOrder.createdAt),
          "'dia' dd 'de' MMMM'",
          {
            locale: pt,
          }
        ),
        answer: helpOrder.answer,
        answerDate: format(
          parseISO(helpOrder.answer_at),
          "'dia' dd 'de' MMMM'",
          {
            locale: pt,
          }
        ),
        student: helpOrder.Student.name,
        email: helpOrder.Student.email,
      },
    });
  }
}

export default new HelpOrderAnswerMail();
