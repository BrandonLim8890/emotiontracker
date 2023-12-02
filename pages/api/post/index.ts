import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: emotion
// Optional fields in body: content
export default async function handle(req, res) {
  const { emotion, content } = req.body;

  const result = await prisma.entry.create({
    data: {
      emotion,
      content,
      author: { connect: { email: 'test@gmail.com' } },
    },
  });
  res.json(result);
}
