const User = require('./User');

describe('Classe User', () => {
    test('Utilisateur valide', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        expect(user.isValid()).toBe(true);
    });

    test('Email invalide', () => {
        const user = new User("invalid-email", "Ibrahim", "Ouahabi", "Password123", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Mot de passe invalide (moins de 8 caractères)', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Pass1", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Mot de passe invalide (pas de chiffre)', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Mot de passe invalide (pas de majuscule)', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "password123", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Mot de passe invalide (pas de minuscule)', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "PASSWORD123", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Âge invalide (moins de 13 ans)', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "2015-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Prénom manquant', () => {
        const user = new User("test@example.com", "", "Ouahabi", "Password123", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Nom manquant', () => {
        const user = new User("test@example.com", "Ibrahim", "", "Password123", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Date de naissance invalide', () => {
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", "not-a-date");
        expect(user.isValid()).toBe(false);
    });

    test('Prénom avec espaces seulement', () => {
        const user = new User("test@example.com", "   ", "Ouahabi", "Password123", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Nom avec espaces seulement', () => {
        const user = new User("test@example.com", "Ibrahim", "   ", "Password123", "2000-01-01");
        expect(user.isValid()).toBe(false);
    });

    test('Âge exactement 13 ans', () => {
        const today = new Date();
        const thirteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 13));
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", thirteenYearsAgo.toISOString().split('T')[0]);
        expect(user.isValid()).toBe(true);
    });

    test('Âge juste avant 13 ans', () => {
        const today = new Date();
        const almostThirteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 13, today.getMonth(), today.getDate() + 1));
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", almostThirteenYearsAgo.toISOString().split('T')[0]);
        expect(user.isValid()).toBe(false);
    });

    test('Âge juste après 13 ans', () => {
        const today = new Date();
        const justOverThirteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 13, today.getMonth(), today.getDate() - 1));
        const user = new User("test@example.com", "Ibrahim", "Ouahabi", "Password123", justOverThirteenYearsAgo.toISOString().split('T')[0]);
        expect(user.isValid()).toBe(true);
    });
});
