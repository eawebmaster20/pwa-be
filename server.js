const express = require('express')
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
var serviceAccount = require("./service account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://analytics-crud-default-rtdb.europe-west1.firebasedatabase.app"
});
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


app.get('/api/', (req, res)=>{
    res.send('Welcome to the API')
})

app.post('/api/send-notification', (req, res)=>{
    console.log('Send notification request received')
    const payload = {
        token: req.body.token,
        notification: {
            title:'Registration notification',
            body: 'lets see if it worked or not'
        }
    }
    admin.messaging().send(payload)
    .then((response)=>{
        res.status(200).json({
            message:'sucessfully sent',
        })
    })
    .catch((error)=> {
        res.send('error: ' + error)
        console.log('Error sending message:', error);
    });
})

app.listen(5000,()=>{ 
    console.log(" app started on port 5000");
    
})