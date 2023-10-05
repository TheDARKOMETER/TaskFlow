const dotenv = require('dotenv')
var admin = require("firebase-admin");
dotenv.config({ path: '.env.local' })
var serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN
};


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const authenticateUser = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization?.split('Bearer ')[1]
        console.log(idToken)
        if (!idToken) {
            console.log("Token null")
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const decodedtoken = await admin.auth().verifyIdToken(idToken)

        req.user = { uid: decodedtoken.uid }
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}

module.exports = authenticateUser