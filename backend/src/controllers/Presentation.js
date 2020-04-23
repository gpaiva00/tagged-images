const pptxgen = require('pptxgenjs');
const getTimestamp = require('../helpers/getTimestamp');

function addDefaultSlideImage(pptx) {
  const slide = pptx.addSlide();

  slide.addImage({
    path: 'https://i.ibb.co/q96c55J/texto-do-ano-2020.jpg',
    w: '100%',
    h: '100%',
    sizing: {
      type: 'cover',
      w: '100%',
      h: '100%',
    },
  });
}

module.exports = {
  async create(req, res) {
    const { images } = req.body;

    // create file name
    let fileName = "Demo_Stream_" + getTimestamp() + ".pptx";
   
    // 1. Create a new Presentation
    let pptx = new pptxgen();
    pptx.company = 'Tagged Images';
    pptx.title = 'Teste de Apresentação';

    // adds first the default slide image
    addDefaultSlideImage(pptx);

    // create slide with each selected image
    images.forEach((image) => {
      const slide = pptx.addSlide();
      const imageUrl = image.url;
      // set image config
      slide.addImage({
        path: imageUrl,
        w: '100%',
        h: '100%',
        sizing: {
          type: 'cover',
          w: '100%',
          h: '100%',
        },
      });

      // add default slide image
      addDefaultSlideImage(pptx);
    });

    //  4. Save the Presentation
    pptx.writeFile(`./tmp/${fileName}`)
      .catch(err => {
        throw err;
      })
      .then(fileName => {
        const newFileName = fileName.split('/')[2];
        return res.json(newFileName);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: 'Create presentation failed.' })
      });
  },

  async download(req, res) {
    try {
      const { fileName } = req.params;
      const fileUrl = `./tmp/${fileName}`;
      
      return res.download(fileUrl, fileName, (err) => {
        if (err) res.status(500).json({ error: 'File not found.' });
      });
    } catch(err) {
      console.log(err);
      res.status(500).json({ error: 'Download presentation failed.' })
    }
  },
}

  //  pres.stream()
	// 	.catch(err => {
	// 		throw err;
	// 	})
	// 	.then(data => {
	// 		res.writeHead(200, { "Content-disposition": "attachment;filename=" + fileName, "Content-Length": data.length });
  //     return res.end(new Buffer.from(data, "binary"));
	// 	})
	// 	.catch(err => {
	// 		console.log("ERROR: " + err);
	// 	});
