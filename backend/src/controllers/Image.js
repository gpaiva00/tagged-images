const Image = require('../database/models/Image');

module.exports = {
  async index(req, res) {
    const { page = 1, tags = [] } = req.query;
    const skip = (page - 1) * 5;
    const isFiltering = tags.length;
    let filter = {};
    
    filter = isFiltering ? { tags: { $in: tags.split(',') } } : {};
    
    const images = await Image
    .find(filter)
    .sort('-updatedAt')
    .limit(5)
    .skip(skip);
    
    const count = isFiltering 
      ? images.length 
      : await Image.count();

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