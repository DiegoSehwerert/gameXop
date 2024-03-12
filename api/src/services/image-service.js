const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')

module.exports = class ImageService {
  uploadImage = async images => {
    const result = []
  
    let filename;
    for (const image in images.file) {
      filename = images.file[image].originalname;
      if (filename.includes(' ')) filename = filename.replace(/\s/g, '-');
      const newFilename = await fs.access(path.join(__dirname, `../storage/images/gallery/original/${path.parse(filename).name}.webp`)).then(async () => {
        // TODO Dar al usuario la opción de sobreescribir la imagen
        return `${path.parse(filename).name}-${new Date().getTime()}.webp`
      }).catch(async () => {
        return `${path.parse(filename).name}.webp`
      })
      console.log(newFilename);
      await sharp(images.file[image].buffer)
        .webp({ lossless: true })
        .toFile(path.join(__dirname, `../storage/images/gallery/original/${newFilename}`))
  
      await sharp(images.file[image].buffer)
        .resize(135, 135)
        .webp({ lossless: true })
        .toFile(path.join(__dirname, `../storage/images/gallery/thumbnail/${newFilename}`))
  
      result.push(newFilename)
    }
    console.log(result);
  }

    // originalname = originalname.replace(/\s/g, '-');

    resizeImages = async (images) => {

    }

    deleteImages = async filename => {

    }
  }
