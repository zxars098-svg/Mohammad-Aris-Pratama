import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const profile = await prisma.profile.findFirst();
      return res.json(profile || null);
    }

    if (req.method === 'PUT') {
      const body = await parseBody(req);
      const existing = await prisma.profile.findFirst();
      const profile = existing
        ? await prisma.profile.update({ where: { id: existing.id }, data: body })
        : await prisma.profile.create({ data: { ...body, id: 'profile-1' } });
      return res.json(profile);
    }

    res.setHeader('Allow', 'GET, PUT');
    res.status(405).end('Method Not Allowed');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Profile handler error' });
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
