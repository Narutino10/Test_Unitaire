const EmailSenderService = require('./EmailSenderService');

describe('EmailSenderService', () => {
    test('sendEmail should log the correct message', () => {
        console.log = jest.fn(); // Mock console.log

        const email = 'test@example.com';
        const message = 'Votre ToDoList est presque pleine !';
        EmailSenderService.sendEmail(email, message);

        expect(console.log).toHaveBeenCalledWith(`Envoi de l'email à ${email}: ${message}`);
    });
});
