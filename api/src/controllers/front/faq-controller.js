const db = require('../../models')
const Faq = db.Faq
const Op = db.Sequelize.Op

exports.findAll = (req, res) => {

  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 5
  const offset = (page - 1) * limit

  Faq.findAndCountAll({
    attributes: ['id', 'name', 'order', 'createdAt', 'updatedAt'],
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page
      }

      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

