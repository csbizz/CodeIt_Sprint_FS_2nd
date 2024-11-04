const express = require('express');
const { authenticate } = require('../../../lib/auth');
const sequelize = require('../../../sequelize');
const { User, UserCredential, Avatar } = sequelize.models;

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await User.create({ email, name });
    await UserCredential.create({ userId: user.id, password });
    await Avatar.create({ userId: user.id });
    return res.status(201).send(user);
  } catch {
    return res.status(400).send();
  }
});

router.get('/me', authenticate, async (req, res) => {
  res.status(200).send(req.user);
});

router.patch('/me', authenticate, async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await req.user.update({
      email,
      name,
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete('/me', authenticate, async (req, res) => {
  try {
    await req.user.destroy();
    res.status(204).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/me/avatar', authenticate, async (req, res) => {
  const userId = req.user.id;
  const avatar = await Avatar.findOne({ where: { userId } });
  res.status(200).send(avatar);
});

router.patch('/me/avatar', authenticate, async (req, res) => {
  const userId = req.user.id;
  const avatar = await Avatar.findOne({
    where: { userId },
  });
  if (!avatar) return res.status(404).send();

  const { hairType, hairColor, skin, clothes, accessories } = req.body;

  await avatar.update({
    hairType,
    hairColor,
    skin,
    clothes,
    accessories,
  });
  return res.status(200).send(avatar);
});

router.get('/:id', async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId || !Number.isInteger(userId)) {
    return res.status(400).send();
  }
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).send();
  }
  res.status(200).send(user);
});

router.get('/:id/avatar', async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId || !Number.isInteger(userId)) {
    return res.status(400).send();
  }
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).send();
  }

  const avatar = await Avatar.findOne({ where: { userId: user.id } });
  return res.status(200).send(avatar);
});

module.exports = router;
