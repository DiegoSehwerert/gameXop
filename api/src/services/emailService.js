module.exports = class EmailService {
  sendEmail() {
    try {
      // Send email
      return "Email sent successfully!"
    } catch {
      return 0
    }
  }
}