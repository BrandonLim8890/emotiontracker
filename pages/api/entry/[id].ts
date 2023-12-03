import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const id = req.query.id;
  const { emotion, content } = req.body;

  // PUT /api/entry/:id
  // Required fields in body: emotion
  // Optional fields in body: content
  if (req.method === 'PUT') {
    const result = await prisma.entry.update({
      where: { id: id },
      data: {
        emotion,
        content,
      },
    });
    res.json(result);
    // DELETE /api/entry/:id
  } else if (req.method === 'DELETE') {
    const entry = await prisma.entry.delete({
      where: { id: id },
    });
    res.json(entry);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
