const dotenv = require('dotenv')
var admin = require("firebase-admin");
dotenv.config({ path: '.env.local' })
var serviceAccount = require(process.env.ADMIN_CONFIG_PATH);

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