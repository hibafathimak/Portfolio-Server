const reminders = require('../Models/reminders'); 

exports.addReminder = async (req, res) => {
  try {
    const { task, date } = req.body;
    const newReminder = new reminders({
      task,
      date,
    });

    await newReminder.save();
    return res.status(200).json('Reminder added successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await reminders.findByIdAndDelete(id);
    if (!reminder) {
      return res.status(404).json('Reminder not found');
    }

    return res.status(200).json('Reminder deleted successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.getAllReminders = async (req, res) => {
  try {
    const allreminders = await reminders.find();
    return res.status(200).json(allreminders);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

