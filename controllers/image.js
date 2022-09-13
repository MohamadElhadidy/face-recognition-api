const handleImage = (db) => (req, res) => {
     const { id } = req.body
     db('users').returning('entries').increment('entries', 1).where('id', id)
          .then(user => {
               res.json(user[0].entries)
          })
          .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
     handleImage: handleImage
}