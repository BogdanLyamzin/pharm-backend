module.exports = {

    mongoURI: 'mongodb+srv://patrick:1234567890987654321@cluster0-0taps.gcp.mongodb.net/pharm?retryWrites=true&w=majority',
    jwt: {
        secret: 'secret',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '60m'
            },
            refresh: {
                type: 'refresh',
                expiresIn: '120m'
            },
        },
    },
};