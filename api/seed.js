import prisma from '../lib/prisma.js';
import { initialProfile, initialProjects, initialSkills, initialEducation, initialTestimonials } from '../server/seedData.js';

export default async function handler(req, res) {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) await prisma.profile.create({ data: initialProfile });

    const projectCount = await prisma.project.count();
    if (projectCount === 0) await prisma.project.createMany({ data: initialProjects, skipDuplicates: true });

    const skillCount = await prisma.skill.count();
    if (skillCount === 0) await prisma.skill.createMany({ data: initialSkills, skipDuplicates: true });

    const educationCount = await prisma.education.count();
    if (educationCount === 0) await prisma.education.createMany({ data: initialEducation, skipDuplicates: true });

    const testimonialCount = await prisma.testimonial.count();
    if (testimonialCount === 0) await prisma.testimonial.createMany({ data: initialTestimonials, skipDuplicates: true });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
}
