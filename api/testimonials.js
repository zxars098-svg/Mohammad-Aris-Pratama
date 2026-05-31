import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const params = Object.fromEntries(url.searchParams.entries());

    if (req.method === 'GET') {
      const testimonials = await prisma.testimonial.findMany();
      return res.json(testimonials);
    }

    if (req.method === 'POST') {
      const body = await parseBody(req);
      const t = await prisma.testimonial.create({ data: body });
      return res.json(t);
    }

    if (req.method === 'PUT') {
      const body = await parseBody(req);
      if (!params.id) return res.status(400).json({ error: 'Missing id' });
      const t = await prisma.testimonial.update({ where: { id: params.id }, data: body });
      return res.json(t);
    }

    if (req.method === 'DELETE') {
      if (!params.id) return res.status(400).json({ error: 'Missing id' });
      await prisma.testimonial.delete({ where: { id: params.id } });
      return res.json({ success: true });
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    res.status(405).end('Method Not Allowed');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Testimonials handler error' });
  }
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}
