const jwt = require('jsonwebtoken');

/** 
 * Verificar Token
 */

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEEDTOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }
        req.usuario = decoded.usuario;

        next();
    });

}


let verificaRoleAdmin = (req, res, next) => {

    let usuario = req.usuario

    if (usuario.role != 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }


    /*
     res.json({
         ok: true,
         usuario
     }); */

    next();


}

/**
 * Verifica token IMG
 */
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEEDTOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }
        req.usuario = decoded.usuario;

        next();
    })

}


module.exports = {
    verificaToken,
    verificaRoleAdmin,
    verificaTokenImg
}