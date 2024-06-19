const User = require('./User');
const Item = require('./Item');
const ToDoList = require('./ToDoList');
const EmailSenderService = require('./EmailSenderService');

jest.mock('./EmailSenderService');

describe('Classe ToDoList', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    test('L\'utilisateur doit être valide pour créer une ToDoList', () => {
        const invalidUser = new User("invalid-email", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        expect(() => new ToDoList(invalidUser)).toThrow('L\'utilisateur n\'est pas valide');
    });

    test('Peut ajouter un item valide', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        const todoList = new ToDoList(user);
        const item = new Item("Tâche 1", "Ceci est un contenu de tâche valide");
        todoList.add(item);
        expect(todoList.items.length).toBe(1);
    });

    test('Ne peut pas ajouter un item invalide', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        const todoList = new ToDoList(user);
        const invalidItem = new Item("", "Ceci est un contenu de tâche valide");
        expect(() => todoList.add(invalidItem)).toThrow('L\'item n\'est pas valide');
    });

    test('Ne peut pas ajouter plus de 10 items', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        const todoList = new ToDoList(user);
        for (let i = 0; i < 10; i++) {
            const item = new Item(`Tâche ${i}`, "Ceci est un contenu de tâche valide");
            jest.advanceTimersByTime(30 * 60 * 1000); // Avance le temps de 30 minutes
            todoList.add(item);
        }
        expect(() => todoList.add(new Item("Tâche 11", "Ceci est un contenu de tâche valide"))).toThrow('Impossible d\'ajouter plus de 10 items');
    });

    test('Doit attendre 30 minutes entre l\'ajout des items', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        const todoList = new ToDoList(user);
        const item1 = new Item("Tâche 1", "Ceci est un contenu de tâche valide");
        const item2 = new Item("Tâche 2", "Ceci est un autre contenu de tâche valide");

        todoList.add(item1);
        jest.advanceTimersByTime(29 * 60 * 1000); // 29 minutes
        expect(() => todoList.add(item2)).toThrow('Vous devez attendre 30 minutes entre l\'ajout des items');
    });

    test('Envoyer un email à l\'ajout du 8ème item', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        const todoList = new ToDoList(user);
        for (let i = 0; i < 7; i++) {
            const item = new Item(`Tâche ${i}`, "Ceci est un contenu de tâche valide");
            jest.advanceTimersByTime(30 * 60 * 1000); // Assurez-vous que 30 minutes se sont écoulées entre les items
            todoList.add(item);
        }
        const eighthItem = new Item("Tâche 8", "Ceci est un contenu de tâche valide");
        jest.advanceTimersByTime(30 * 60 * 1000); // Assurez-vous que 30 minutes se sont écoulées entre les items
        todoList.add(eighthItem);
        expect(EmailSenderService.sendEmail).toHaveBeenCalledTimes(1);
        expect(EmailSenderService.sendEmail).toHaveBeenCalledWith(user.email, 'Votre ToDoList est presque pleine !');
    });

    test('La méthode de sauvegarde doit lever une erreur', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        const todoList = new ToDoList(user);
        expect(() => todoList.save()).toThrow('Méthode de sauvegarde non implémentée');
    });
});
