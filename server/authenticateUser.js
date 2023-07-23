var admin = require("firebase-admin");

var serviceAccount = require("./admin-config/taskflow-443cf-firebase-adminsdk-xxmeg-59f39566da.json");

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
        return res.status(401).json({error: 'Unauthorized'})
    }
}

module.exports = authenticateUser