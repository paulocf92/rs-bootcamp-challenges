import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    const endDate = format(
      parseISO(registration.end_date),
      "'dia' dd 'de' MMMM'",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${registration.Student.name} <${registration.Student.email}>`,
      subject: `Matrícula efetuada com sucesso!`,
      template: 'registration',
      context: {
        planTitle: registration.PaymentPlan.title,
        planDuration: registration.PaymentPlan.duration,
        price: registration.price,
        endDate,
        student: registration.Student.name,
        email: registration.Student.email,
      },
    });
  }
}

export default new RegistrationMail();
