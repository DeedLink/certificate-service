import Certificate from '../models/Certificate.js';
import { createCertificate } from '../validators/certificateValidator.js';

export async function create(req, res, next) {
  try {
    const { error, value } = createCertificate.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const cert = new Certificate(value);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const { type, q, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }];

    const docs = await Certificate.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .lean();

    res.json({ page: Number(page), limit: Number(limit), results: docs });
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Certificate.findById(id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { error, value } = createCertificate.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updated = await Certificate.findByIdAndUpdate(id, value, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Certificate.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}