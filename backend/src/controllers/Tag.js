import Tag from '@models/Tag';

export default {
  async index(req, res) {
    const tags = await Tag.find().sort('text');
    const count = await Tag.count();

    res.header('X-Total-Count', count);

    return res.send(tags);
  },

  async create(req, res) {
    const tags = req.body;

    try {
      await Tag.create(tags);
      return res.send(tags);

    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Não foi possível salvar as novas tags.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const findTag = await Tag.findById(id);

    if (!findTag) return res.status(404).json({ error: 'Não existe uma tag com este ID' });

    await Tag.findByIdAndDelete(id);

    return res.status(204).send();
  },
}
