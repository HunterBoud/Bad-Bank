const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
const { BrowserRouter, Route } = require('react-router-dom');






app.use(express.static('public'))
app.use(cors())


app.get('/account/create/:name/:email/:password', (req, res)=> {
    dal.create(req.params.name, req.params.email, req.params.password).
            then((user) => {
            console.log(user)
            res.send(user)
        })
})
app.get('/account/login/:email/:password', (req, res) => {
    dal.checkLogin(req.params.email, req.params.password)
      .then((token) => {
        res.send({ token });
      })
      .catch((error) => {
        console.error('Login failed:', error);
        res.status(401).send({ error: 'Login failed' });
      });
  });
  

app.post('/account/deposit/:email/:deposit', (req,res)=>{
    const parsedDeposit = parseFloat(req.params.deposit).toFixed(2) * -1;
    const newDeposit = (parsedDeposit * -1)

    dal.makeDeposit(req.params.email, newDeposit)
        .then((doc)=> {
            res.send({ balance: doc.balance }); 
        }).catch((error) => {
            console.error('Deposit failed:', error);
            res.status(401).send({ error: 'Deposit failed' });
          });
})
app.post('/account/withdraw/:email/:withdraw', (req,res)=>{
    const parsedWithdraw = parseFloat(req.params.withdraw).toFixed(2);
    const newWithdraw = (parsedWithdraw * -1)

    dal.makeWithdraw(req.params.email, newWithdraw)
        .then((doc)=> {
            res.send({ balance: doc.balance }); 
        }).catch((error) => {
            console.error('Deposit failed:', error);
            res.status(401).send({ error: 'Deposit failed' });
          });
})

app.get('/account/balance/:email/:balance', (req,res)=>{
    dal.all()
        .then((docs)=> {
            console.log(docs)
            res.send(docs)
        })
})
app.get('/account/all', (req,res)=> {
    dal.all()
        .then((docs)=> {
            console.log(docs)
            res.send(docs)
        })

})

app.listen(3000, (req, res)=> {
    console.log('Running on port 3000!')
})