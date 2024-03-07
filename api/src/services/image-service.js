const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')

module.exports = class ImageService {
  uploadImage = async images => {
   let originalname = images.file[0].originalname
   originalname = originalname.replace(/\s/g, '-')
   console.log(originalname)
  }

  resizeImages = async (images) => {

  }

  deleteImages = async filename => {

  }
}