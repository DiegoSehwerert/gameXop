const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')

module.exports = class ImageService {
  uploadImage = async images => {
    for (let i = 0; i < images.file.length; i++) {
      let originalname = images.file[i].originalname
      originalname = originalname.replace(/\s/g, '-')
      console.log(originalname)
    }
  }

  resizeImages = async (images) => {

  }

  deleteImages = async filename => {

  }
}