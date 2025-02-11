import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

// In-memory storage (replace with a proper database in production)
let leads = [];
let properties = [];
let documents = [];

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Leads API
app.get('/api/leads', (req, res) => {
  res.json(leads);
});

app.post('/api/leads', (req, res) => {
  const lead = {
    _id: Date.now().toString(),
    ...req.body,
    documents: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  leads.push(lead);
  res.status(201).json(lead);
});

app.put('/api/leads/:id', (req, res) => {
  const index = leads.findIndex((l) => l._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  leads[index] = {
    ...leads[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  res.json(leads[index]);
});

app.delete('/api/leads/:id', (req, res) => {
  leads = leads.filter((l) => l._id !== req.params.id);
  res.status(204).send();
});

// Documents API
app.post('/api/leads/:id/documents', upload.single('file'), (req, res) => {
  const lead = leads.find((l) => l._id === req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const document = {
    _id: Date.now().toString(),
    name: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    leadId: lead._id,
    createdAt: new Date().toISOString(),
  };

  documents.push(document);
  lead.documents.push(document._id);
  res.status(201).json(document);
});

// Properties API
app.get('/api/properties', (req, res) => {
  res.json(properties);
});

app.post('/api/properties', (req, res) => {
  const property = {
    _id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  properties.push(property);
  res.status(201).json(property);
});

app.put('/api/properties/:id', (req, res) => {
  const index = properties.findIndex((p) => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }
  properties[index] = {
    ...properties[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  res.json(properties[index]);
});

app.delete('/api/properties/:id', (req, res) => {
  properties = properties.filter((p) => p._id !== req.params.id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});