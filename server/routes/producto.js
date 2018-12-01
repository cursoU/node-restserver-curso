const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion');


let app = express();

let Producto = require('../models/producto');

let producto = new Producto({
    nombre: String,
    precioUni: Number,
    descripcion: String,
    disponible: Boolean,
    categoria: String,
    usuario: String
});


/**
 *Obtener los productos 
 */
app.get('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let desde = req.query.desde || 0;
    desde = Number(desde);


    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            });

        });

});

/**
 *Obtener los productos por id
 */
app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;


    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            });
        });



});


/**
 * crer un nuevo producto
 */
app.post('/producto/:id', verificaToken, (req, res) => {
    let body = req.body;

    let produ = producto;

    produ.nombre = body.nombre;
    produ.precioUni = body.precioUni;
    produ.descripcion = body.descripcion;
    produ.disponible = body.disponible;
    produ.categoria = body.categoria;
    produ.usuario = req.usuario._id;

    produ.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    })


});



/**
 * actualizar un nuevo producto
 */
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;
    /*
        let nomProducto = {
            nombre: body.nombre,      
            precioUni: body.precioUni,
            categoria: body.categoria,
            disponible: body.disponible,
            descripcion: body.descripcion
        }
        */
    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }


        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            });
        });


    });


});


/**
 * borrar un nuevo producto
 */
app.delete('/producto/:id', verificaToken, (req, res) => {
    /*
     *cambiar estado
     */

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.disponible = false;


        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado,
                message: 'Producto Borrado'
            });
        });


    });

});


/**
 * Buscar productos
 */
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i') // la sensible con mayus y minus

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        })


});


module.exports = app;