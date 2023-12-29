const CLARIFAI_API = process.env.CLARIFAI_API;

const USER_ID = 'clarifai';
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';



const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + CLARIFAI_API);



const handleApiCall = (req, res) => {
     stub.PostModelOutputs(
          {
               user_app_id: {
                    "user_id": USER_ID,
                    "app_id": APP_ID
               },
               model_id: MODEL_ID,
               version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
               inputs: [
                    { data: { image: { url: req.body.input, allow_duplicate_url: true } } }
               ]
          },
          metadata,
          (err, response) => {
               if (err) {
                    res.status(400).json(err)
                    throw new Error(err);
               }

               if (response.status.code !== 10000) {
                    throw new Error("Post model outputs failed, status: " + response.status.description);
               }

               // Since we have one input, one output will exist here
               res.json(response)
          }

     );
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