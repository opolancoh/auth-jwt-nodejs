const express = require('express');
const router = express.Router();

const authorize = require('../../middleware/authorize');
const service = require('./user.service');

router.get('/', authorize(['admin', 'owner']), async (req, res) => {
  const result = await service.find();
  res.status(200).send(result);
});

router.get('/me', authorize(), async (req, res) => {
  const result = await service.findById(req.user.id);
  res.status(200).send(result);
});

router.post('/', authorize(['admin']), async (req, res) => {
  const result = await service.create(req.body);
  res.status(200).send(result);
});

module.exports = router;
