const MongoClient = require('mongodb').MongoClient

const url = "mongodb+srv://hjboud:hjboud2002@cluster0.imovtwf.mongodb.net/?retryWrites=true&w=majority";
let db = null
const jwt = require('jsonwebtoken')

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log("Connected successfully to db server")

    db = client.db('bad-bank')

})


function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users')
        const doc = {name, email, password, balance: 0}
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err) : resolve(doc)
        })
    })
}

function makeDeposit(email, deposit) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.findOneAndUpdate(
      { email: email },
      { $inc: { balance: deposit } },
      { returnOriginal: false },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.value);
        }
      }
    );
  });
}

function makeWithdraw(email, withdraw) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.findOneAndUpdate(
      { email: email },
      { $inc: { balance: withdraw } },
      { returnOriginal: false },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.value);
        }
      }
    );
  });
}

function all() {
    return new Promise((resolve, reject) => {
        const customers = db
        .collection('users')
        .find({})
        .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs)
        })
    })
}

function checkLogin(email, password) {
    return new Promise((resolve, reject) => {
      const userInfo = db.collection('users');
      const loginDetails = { email, password };
      userInfo.findOne(loginDetails, (error, user) => {
        if (error) {
          reject(error);
        } else if (user) {
          const { name: userName, balance: userBalance, email: userEmail, password: userPassword } = user;
          const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });
          resolve({token, userName, userBalance, userEmail, userPassword});
        } else {
          reject(new Error('Login failed'));
        }
      });
    });
  }

module.exports = {create, all, checkLogin, makeDeposit, makeWithdraw}