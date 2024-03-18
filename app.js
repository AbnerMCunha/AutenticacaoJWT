//import "dotenv/config";    //process.env.DB_CONNECTION_STRING
//import mongo from "mongoose";

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const porta = 3000;


const url = 'mongodb+srv://abnermcunha:IXLRFz43eXu0Sx5Z@clusterapi.z4tjat4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterApi'
//const options = { recconectTries: Number.MAX_VALUE, recconectInterval: 5000, poosize: 5 , useNewUrlParser:true}
//const options = { autoReconnect : true , autoReconnectInterval: 5000, poolSize: 5 , useNewUrlParser:true}
//const options = { useNewUrlParser: true, useUnifiedTopology: true }
//const options = {serverSelectionTimeoutMS: 5000}
//const options = {useNewUrlParser: true, useUnifiedTopology: true};
const options = {}


mongoose.connect(url, options);
//mongo.set('useCreateIndex', true);

mongoose.connection.on('error', (error)=> {
    console.log(`Erro na Conexão: ${error}`);
})
mongoose.connection.on('discconected', ()=> {
    console.log(`DESConexão `);
})

mongoose.connection.on('connected', ()=> {
    console.log(`Conexão ATIVA`);
})

app.use(express.json());


const indexRoute = require('./routes/index.js');
const usersRoute =  require('./routes/users.js');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(porta);

module.exports = app;

//mongodb+srv://abnermcunha:<password>@clusterapi.z4tjat4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterApi
//mongodb+srv://abnermcunha:<@Senha123>@clusterapi.z4tjat4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterApi

/*
app.get('/', (req, res)=> {
    let obj = req.query;
    return res.send({message: `Nome: ${obj.nome}`});
    //return res.send({message: "OK com o Get!"});
})

app.post('/', (req, res)=>{
    return res.send({message: "Ok com metododo Post."})
})
*/


/*

{
    "user": {
        "_id": "65dfba16faeb6e629b594629",
        "email": "teste3@teste.com.br",
        "created": "2024-02-28T22:56:22.965Z",
        "__v": 0
    },
    "toke": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGZiYTE2ZmFlYjZlNjI5YjU5NDYyOSIsImlhdCI6MTcwOTE2MDk4MywiZXhwIjoxNzA5NzY1NzgzfQ.u6ZufeJGuw96Ya7rj2wQAMTl2PsULoOgZK13J8BAg9Q"
}
*/