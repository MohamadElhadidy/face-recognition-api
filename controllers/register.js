const handleRegister = (db, bcrypt) => (req, res) => {
     const {email, name, password} = req.body
     if (!email || !name || !password){
          return res.status(400).json('invalid format')
     }
     const  hash = bcrypt.hashSync(password);
     db.transaction(trx => {
          trx('login')
               .insert({
                    email: email,
                    hash: hash
               }).then(() => {
                    db('users')
                         .insert({
                              name: name,
                              email: email,
                              joined: new Date()
                         }).then(userId => {
                              db.select('*').from('users')
                              .where('id', userId)
                              .then(user => res.json(user[0]))
                         })
               
               })
               .then(trx.commit)
               .catch(trx.rollback)
     }).catch(err => res.status(400).json('unable to register'))
}


module.exports ={
     handleRegister :handleRegister
}