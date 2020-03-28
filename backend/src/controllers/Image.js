import Image from '@models/Image';

export default {
  async index(req, res) {
    const { page = 1 } = req.query;
    const skip = (page - 1) * 10;
    const count = await Image.count();
    const images = await Image
      .find()
      .sort('-updatedAt')
      .limit(10)
      .skip(skip);

    res.header('X-Total-Count', count);
    return res.send(images);
  },

  async create(req, res) {
    const [ data ] = req.body;
    const { image, tags } = data; 

    const storedImage = await Image.create({ image, tags });

    return res.send(storedImage);
  },

  async update(req, res) {
    const { id } = req.params;
    const findImage = await Image.findById(id);
    const { tags } = req.body;

    if (!findImage) return res.status(404).json({ error: 'Não existe uma image com este ID' });

    await Image.findByIdAndUpdate(id, { tags });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const findImage = await Image.findById(id);

    if (!findImage) return res.status(404).json({ error: 'Não existe uma image com este ID' });

    // const { image: { delete_url } } = findImage;
    
    await Image.findByIdAndDelete(id);
    // await axios.delete(delete_url);

    return res.status(204).send();
  }
}