const express = require('express');
const upload = require('../../../lib/upload');
const { authenticate } = require('../../../lib/auth');
const { getOgImageUrl } = require('../../../lib/og');
const sequelize = require('../../../sequelize');

const { User, UserCredential, Link } = sequelize.models;

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
  const { email, name, password } = req.body;
  const avatar = req.file?.location;
  try {
    const user = await User.create({ email, name, avatar });
    await UserCredential.create({ userId: user.id, password });
    return res.status(201).send(user);
  } catch {
    return res.status(400).send();
  }
});

router.get('/me', authenticate, async (req, res) => {
  res.status(200).send(req.user);
});

router.patch('/me', authenticate, upload.single('avatar'), async (req, res) => {
  const { email, name, bio } = req.body;
  const avatar = req.file?.location;
  try {
    const user = await req.user.update({
      avatar,
      email,
      name,
      bio,
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
    console.log(e);
    res.status(400).send();
  }
});

router.get('/me/links', authenticate, async (req, res) => {
  const userId = req.user.id;
  const links = await Link.findAll({ where: { userId } });
  res.status(200).send(links);
});

router.get('/me/links/:id', authenticate, async (req, res) => {
  const userId = req.user.id;
  const id = Number(req.params.id);
  const link = await Link.findOne({ where: { id, userId } });
  if (!link) return res.status(404).send();
  return res.status(200).send(link);
});

router.post('/me/links', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { url, title } = req.body;
  const thumbUrl = await getOgImageUrl(url);
  try {
    const link = await Link.create({
      title,
      url,
      thumbUrl,
      userId,
    });
    return res.status(200).send(link);
  } catch {
    return res.status(400).send();
  }
});

router.patch('/me/links/:id', authenticate, async (req, res) => {
  const userId = req.user.id;
  const id = Number(req.params.id);
  const link = await Link.findOne({
    where: { id, userId },
  });
  if (!link) return res.status(404).send();

  const { title, url } = req.body;
  if (url && url !== link.url) {
    const thumbUrl = await getOgImageUrl(url);
    link.set({ thumbUrl });
  }
  link.set({ title, url });
  await link.save();

  return res.status(200).send(link);
});

router.delete('/me/links/:id', authenticate, async (req, res) => {
  const userId = req.user.id;
  const id = Number(req.params.id);
  const link = await Link.findOne({ where: { id, userId } });
  if (!link) return res.status(404).send();

  await link.destroy();
  return res.status(204).send();
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

router.get('/:id/links', async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId || !Number.isInteger(userId)) {
    return res.status(400).send();
  }
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).send();
  }

  const links = await Link.findAll({ where: { userId: user.id } });
  return res.status(200).send(links);
});

module.exports = router;
