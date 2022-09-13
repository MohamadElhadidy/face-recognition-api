const handleRegister = (db, bcrypt) => (req, res) => {
     const {email, name, password} = req.body
     const  hash = bcrypt.hashSync(password);
     db.transaction(trx => {
          trx('login')
               .insert({
                    email: email,
                    hash: hash
               }).then(loginEmail => {
                    db('users')
                         .insert({
                              name: name,
                              email: loginEmail[0].email,
                              joined: new Date()
                         }).then(user => {
                              res.json(user[0])
                         })
               })
               .then(trx.commit)
               .catch(trx.rollback)
     }).catch(err => res.status(400).json('unable to register'))
}


module.exports ={
     handleRegister :handleRegister
}