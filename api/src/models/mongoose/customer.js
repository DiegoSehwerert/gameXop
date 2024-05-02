module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
      },
      surname: {
        type: String,
      },
      telephone: {
        type: String,
      },
      email: {
        type: String,
      },
      images: [{
        type: mongoose.Schema.Types.Mixed
      }],
      deletedAt: Date
    },
    { timestamps: true }
  )

  const Customer = mongoose.model('Customer', schema, 'customers')
  
  return Customer
}