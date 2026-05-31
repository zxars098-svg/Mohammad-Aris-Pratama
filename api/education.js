import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const params = Object.fromEntries(url.searchParams.entries());

    if (req.method === 'GET') {
      const education = await prisma.education.findMany({ orderBy: { tahunMulai: 'desc' } });
      return res.json(education);
    }

    if (req.method === 'POST') {
      const body = await parseBody(req);
      const edu = await prisma.education.create({ data: body });
      return res.json(edu);
    }

    if (req.method === 'PUT') {
      const body = await parseBody(req);
      if (!params.id) return res.status(400).json({ error: 'Missing id' });
      const edu = await prisma.education.update({ where: { id: params.id }, data: body });
      return res.json(edu);
    }

    if (req.method === 'DELETE') {
      if (!params.id) return res.status(400).json({ error: 'Missing id' });
      await prisma.education.delete({ where: { id: params.id } });
      return res.json({ success: true });
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    res.status(405).end('Method Not Allowed');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Education handler error' });
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
