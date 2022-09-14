const Clarifai = require('clarifai');
const ClarifaiApp = new Clarifai.App({
     apiKey: process.env.CLARIFAI_API
});

const handleApiCall = (req, res) => {
     ClarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
          .then((response) => {
               res.json(response)
          })
          .catch(err => res.status(400).json('unable to get face'))
}


const handleImage = (db) => (req, res) => {
     const { id } = req.body
     db('users').increment('entries', 1).where('id', id)
          .then(userId => {
               db.select('*').from('users')
                    .where('id', id)
                    .then(user => res.json(user[0].entries))
                    .catch(err => res.status(400).json('unable to get entries'))
          })
          .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
     handleImage: handleImage,
     handleApiCall: handleApiCall
}