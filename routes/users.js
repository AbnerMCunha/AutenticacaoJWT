const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/users.js');

const createToken = (userId) => {
    return jwt.sign({ id: userId }, 'batata123', { expiresIn: '7d' });
};

router.get('/',async (req, res) => {
    try{
        const data = await Users.find({});
        return res.status(200).send(data);
    }
    catch(e){
        return res.send(e)
    }
})

router.post('/',(req, res) => {
    return res.status(200).send({message: "OK com metodo Post da Rota USERS"})
})

router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Informe Email e Senha para criação de Usuário" });
    }

    try {
        let user = await Users.findOne({ email });

        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await Users.create({ email, password: hashedPassword });
            user = newUser;
            return res.status(200).json({ message: "Usuário NOVO criado!", user });
        } else {
            return res.status(400).json({ message: "Usuário já criado!" });
        }

        const token = createToken(user.id);
        return res.status(201).json({ user, token });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});


router.get('/auth', async (req, res)=>{

    const objeto = req.body ;
    const { email ,  password } = objeto ;

    try{

        const user = await Users.findOne({email})
        if(!user) return res.send({error: "Usuario não existe na Base de Dados."})
        if(!user.password) return res.send({error: "Usuario não tem Senha."})

        const senhaCorreta = await bcrypt.compare( password, user.password );
        if(senhaCorreta){
            const resposta = {user, token: await createToken(user.id)}
            return res.send(resposta)
        }else{
            return res.send({message: "Senha não foi Descriptografada."});
        }
    }catch(e){
        return res.send({message: `Ocorreu um Erro: ${e}`})
    }

})


module.exports = router;
