const express = require('express');
const router = express.Router();
const studentService = require('../services/StudentServices');

// Create a student
router.post('/', async (req, res) => {
  try {
    const student = await studentService.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await studentService.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await studentService.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  try {
    const student = await studentService.update(req.params.id, req.body);
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    await studentService.delete(req.params.id);
    res.json({ message: 'Student successfully deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
