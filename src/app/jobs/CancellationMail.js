const { format, parseISO } = require('date-fns');
const { pt } = require('date-fns/locale/pt');

const Mail = require('../../lib/Mail');

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    console.log('a fila executou');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        })),
      },
    });
  }
}

module.exports = new CancellationMail();
