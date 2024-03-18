const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.js');

router.get('/', auth,  (req, res) => {
    return res.send({message: "OK com metodo Get da Rota Raiz"})
})

router.post('/',(req, res) => {
    return res.send({message: "OK com metodo Post da Rota Raiz"})
})

module.exports = router;