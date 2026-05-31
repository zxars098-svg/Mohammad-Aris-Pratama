import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialEducation,
  initialTestimonials
} from './seedData.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

const ensureSeedData = async () => {
  const profile = await prisma.profile.findFirst();
  if (!profile) {
    await prisma.profile.create({ data: initialProfile });
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({ data: initialProjects, skipDuplicates: true });
  }

  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    await prisma.skill.createMany({ data: initialSkills, skipDuplicates: true });
  }

  const educationCount = await prisma.education.count();
  if (educationCount === 0) {
    await prisma.education.createMany({ data: initialEducation, skipDuplicates: true });
  }

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({ data: initialTestimonials, skipDuplicates: true });
  }
};

const getProfile = async () => {
  const profile = await prisma.profile.findFirst();
  if (profile) return profile;
  return prisma.profile.create({ data: initialProfile });
};

app.get('/api/status', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/seed', async (_req, res) => {
  try {
    await ensureSeedData();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

app.get('/api/profile', async (_req, res) => {
  try {
    const profile = await getProfile();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const data = req.body;
    const existing = await prisma.profile.findFirst();
    const profile = existing
      ? await prisma.profile.update({ where: { id: existing.id }, data })
      : await prisma.profile.create({ data: { ...data, id: initialProfile.id } });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.get('/api/projects', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.get('/api/projects/:slug', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load project' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const data = req.body;
    const project = await prisma.project.create({ data });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const data = req.body;
    const project = await prisma.project.update({ where: { id: req.params.id }, data });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.get('/api/skills', async (_req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load skills' });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const data = req.body;
    const skill = await prisma.skill.create({ data });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  try {
    const data = req.body;
    const skill = await prisma.skill.update({ where: { id: req.params.id }, data });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await prisma.skill.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

app.get('/api/education', async (_req, res) => {
  try {
    const education = await prisma.education.findMany({ orderBy: { tahunMulai: 'desc' } });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load education' });
  }
});

app.post('/api/education', async (req, res) => {
  try {
    const data = req.body;
    const edu = await prisma.education.create({ data });
    res.json(edu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create education' });
  }
});

app.put('/api/education/:id', async (req, res) => {
  try {
    const data = req.body;
    const edu = await prisma.education.update({ where: { id: req.params.id }, data });
    res.json(edu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update education' });
  }
});

app.delete('/api/education/:id', async (req, res) => {
  try {
    await prisma.education.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete education' });
  }
});

app.get('/api/testimonials', async (_req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load testimonials' });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const data = req.body;
    const testimonial = await prisma.testimonial.create({ data });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

app.put('/api/testimonials/:id', async (req, res) => {
  try {
    const data = req.body;
    const testimonial = await prisma.testimonial.update({ where: { id: req.params.id }, data });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
