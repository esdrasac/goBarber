const Yup = require('yup');

const User = require('../models/User');
const Appointment = require('../models/Appointment');

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    const checkProvider = User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkProvider) {
      return res.status(400)
        .json({ error: 'You can only create appointments with providers' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

module.exports = new AppointmentController();
