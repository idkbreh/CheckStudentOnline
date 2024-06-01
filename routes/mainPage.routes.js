const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Student = require('../models/Student');
const CheckInHistory = require('../models/CheckInHistory');

router.get('/', authMiddleware, async (req, res) => {
  res.render('index');
});

router.get('/api/students', authMiddleware, async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

router.post('/api/checkin', authMiddleware, async (req, res) => {
  const { name, type } = req.body;
  const student = await Student.findOne({ name });
  if (student) {
    const checkInHistory = new CheckInHistory({
      name,
      class: student.class,
      checkInType: type,
      date: new Date()
    });
    await checkInHistory.save();
    res.status(200).send('Check-in recorded');
  } else {
    res.status(404).send('Student not found');
  }
});

router.post('/api/students', authMiddleware, async (req, res) => {
  const { name, class: classType, number, role } = req.body;
  const student = new Student({ name, class: classType, number, role });
  await student.save();
  res.status(201).send('Student added');
});

router.get('/history', authMiddleware, async (req, res) => {
  res.render('history');
});

router.get('/api/history', authMiddleware, async (req, res) => {
  const { name, startDate, endDate } = req.query;
  const filter = {};

  if (name) filter.name = { $regex: name, $options: 'i' };
  if (startDate) filter.date = { $gte: new Date(startDate) };
  if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };

  const history = await CheckInHistory.find(filter);
  res.json(history);
});

module.exports = router;
