import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { emotion, content } = req.body;

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
  } else if (req.method === 'GET') {
    const result = await prisma.entry.findMany({
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    res.json(
      result
        .map((entry) => ({
          ...entry,
          createdAt: JSON.parse(JSON.stringify(entry.createdAt)),
          updatedAt: JSON.parse(JSON.stringify(entry.updatedAt)),
        }))
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
    );
  }
}
