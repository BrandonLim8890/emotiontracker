import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { emotion, content, id } = req.body;

  // POST /api/entry
  // Required fields in body: emotion
  // Optional fields in body: content
  if (req.method === 'POST') {
    const result = await prisma.entry.create({
      data: {
        emotion,
        content,
        author: { connect: { email: 'test@gmail.com' } },
      },
    });
    res.json(result);
    // PUT /api/entry
    // Required fields in body: emotion
    // Optional fields in body: content
  } else if (req.method === 'PUT') {
    const result = await prisma.entry.update({
      where: { id: id },
      data: {
        emotion,
        content,
      },
    });
    res.json(result);
  }
}
