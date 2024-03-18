const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {

        const headerToken = req.headers.authorization ;    
        console.log('headerToken', headerToken);    
        if(!headerToken) return res.send({message: "Token não enviado!"})
        const decoded = await jwt.verify(headerToken, 'batata123' );        
        if(decoded){
            req.user = decoded;
            return next()
        }
        return res.send({error: "Token Inválido!"})

    } catch (e) {
        return res.status(500).json({ message: `Erro ao Autenticar ${e}` });
    }
}

module.exports = auth;

