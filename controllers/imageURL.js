const handleImageURL = (ClarifaiApp, Clarifai) => (req, res) => {
  ClarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
          .then((response) => {
               res.json(response)
          })
          .catch(err => res.status(400).json('unable to get face'))
}


module.exports = {
     handleImageURL: handleImageURL
}