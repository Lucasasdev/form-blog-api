const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria.js')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.send('Página de posts')
})

router.get('/categorias', (req, res)=>{
    
    res.render('admin/categorias')
})

router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategorias')
})
//method post, recebe os dados de addcategorias e adiciona os dados criando uma nova categoria.
router.post('/categorias/nova', (req, res)=>{

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Nome inválido.'})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: 'Slug inválido.'})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: 'Nome da Categoria muito curto.'})
    }

    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    }else{
        const novaCategoria = ({
            nome: req.body.nome,
            slug: req.body.slug
        })
        
        new Categoria(novaCategoria).save().then(()=>{
            console.log('Categoria criada com sucesso.')
        }).catch((err)=>{
            console.log(`Houve um erro: ${err}`)
        })
    }
})

router.get('/teste', (req, res)=>{
    res.send('Isso é um teste')
})

module.exports = router 