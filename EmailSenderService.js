class EmailSenderService {
    static sendEmail(email, message) {
        console.log(`Envoi de l'email à ${email}: ${message}`);
    }
}
module.exports = EmailSenderService;
