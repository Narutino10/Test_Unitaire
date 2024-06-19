const Item = require('./Item');

describe('Classe Item', () => {
    test('Item valide', () => {
        const item = new Item("Tâche 1", "Ceci est un contenu de tâche valide");
        expect(item.isValid()).toBe(true);
    });

    test('Nom d\'item vide', () => {
        const item = new Item("", "Ceci est un contenu de tâche valide");
        expect(item.isValid()).toBe(false);
    });

    test('Contenu d\'item trop long', () => {
        const longContent = "a".repeat(1001);
        const item = new Item("Tâche 1", longContent);
        expect(item.isValid()).toBe(false);
    });
});
