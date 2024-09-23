var rutas = require("express").Router();
const { productos } = require("../bd/conexion");
var {mostrarProductos,nuevoProducto,buscarPorID, borraProducto}=require("../bd/productosbd");

rutas.get("/",async(req,res)=>{
    var productosValidos=await mostrarProductos();
    console.log(productosValidos);
    
    res.json(productosValidos);
});


rutas.get("/buscarPorId/:id",async(req,res)=>{
    var productoValido=await buscarPorID(req.params.id);
    res.json(productoValido);
});

rutas.delete("/borrarProducto/:id",async(req, res)=>{
    var productoBorrado=await borraProducto(req.params.id);
    res.json(productoBorrado);
});

rutas.post("/nuevoProducto",async(req,res)=>{
    var productoValido=await nuevoProducto(req.body);
    res.json(productoValido);
});


module.exports=rutas;