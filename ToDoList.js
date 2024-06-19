const EmailSenderService = require('./EmailSenderService');

class ToDoList {
    constructor(user) {
        if (!user.isValid()) {
            throw new Error('L\'utilisateur n\'est pas valide');
        }
        this.user = user;
        this.items = [];
    }

    add(item) {
        if (!item.isValid()) {
            throw new Error('L\'item n\'est pas valide');
        }
        if (this.items.length >= 10) {
            throw new Error('Impossible d\'ajouter plus de 10 items');
        }
        if (this.items.length > 0) {
            const lastItem = this.items[this.items.length - 1];
            const thirtyMinutes = 30 * 60 * 1000;
            if (new Date() - new Date(lastItem.creationDate) < thirtyMinutes) {
                throw new Error('Vous devez attendre 30 minutes entre l\'ajout des items');
            }
        }
        this.items.push(item);
        if (this.items.length === 8) {
            EmailSenderService.sendEmail(this.user.email, 'Votre ToDoList est presque pleine !');
        }
    }

    save() {
        throw new Error('Méthode de sauvegarde non implémentée');
    }
}

module.exports = ToDoList;
