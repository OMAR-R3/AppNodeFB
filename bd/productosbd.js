const productosBD = require("./conexion").productos;
const Producto = require("../modelos/ProductoModelo");

function validarDatos(producto) {
    var valido = false;
    //console.log(producto);
    if (producto.producto != undefined && producto.cantidad != undefined && producto.precio != undefined) {
        valido = true;
    }
    //console.log(valido);
    
    return valido;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validarDatos(producto1.getProducto)) {
            productosValidos.push(producto1.getProducto);
        }
    });
    return productosValidos;
}

async function buscarPorID(id) {
    const producto = await productosBD.doc(id).get();
    //console.log(producto);
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    var productoValido = false;
   // console.log(producto1);
    if (validarDatos(producto1.getProducto)) {
        productoValido = producto1.getProducto;
    }
    //console.log(productoValido);
    
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    var productoValido = false;
    if (validarDatos(producto1.getProducto)) {
        await productosBD.doc().set(producto1.getProducto);
        productoValido = true;
    }
    return productoValido;
}

async function borraProducto(id) {
    var productoValido = await buscarPorID(id);
    var productoBorrado = false;
    if (productoValido) {
        await productosBD.doc(id).delete();
        productoBorrado = true;
    }
    return productoBorrado;
}


module.exports = {
    buscarPorID,
    mostrarProductos,
    nuevoProducto,
    borraProducto
}