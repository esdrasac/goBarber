const { startOfDay, endOfDay, parseISO } = require('date-fns');
const { Op } = require('sequelize');

const Appointment = require('../models/Appointment');
const User = require('../models/User');

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { page, date } = req.query;
    const parsedDate = parseISO(date);

    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        date: {
          [Op.between]: [
            startOfDay(parsedDate),
            endOfDay(parsedDate),
          ],
        },
      },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(appointment);
  }
}

module.exports = new ScheduleController();
