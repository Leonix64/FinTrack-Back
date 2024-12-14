const validateEnv = () => {
    const requiredVars = [
        'FIREBASE_PROJECT_ID',
        'FIREBASE_PRIVATE_KEY',
        'FIREBASE_CLIENT_EMAIL',
        'FIREBASE_DATABASE_URL',
        'FIREBASE_STORAGE_BUCKET',
    ];

    requiredVars.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Falta la variable de entorno: ${key}`);
        }
    });
};

module.exports = validateEnv;