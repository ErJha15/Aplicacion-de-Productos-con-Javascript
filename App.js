class Producto {
    constructor(Nombre,Precio,Año){
        this.Nombre= Nombre;
        this.Precio= Precio;
        this.Año= Año;
    }
}

class UI {
    agregarproducto(producto){
        const productolista = document.getElementById('productos-lista');
        const elemento = document.createElement('div');
        elemento.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Producto Nombre</strong>: ${producto.Nombre}
                    <strong>Producto Precio</strong>: ${producto.Precio}
                    <strong>Producto Año</strong>: ${producto.Año}
                    <a href="#" class="btn btn-danger" name=eliminar >Eliminar</a>
                </div>  
            </div>
        `;
        productolista.appendChild(elemento);     
    }

    resetForm(){
        document.getElementById('producto-form').reset();
    }

    borrarproducto(elemento) {
        if(elemento.name === 'eliminar'){
            elemento.parentElement.parentElement.parentElement.remove();
            this.mostrarmensaje('Producto Eliminado Satisfactoriamente', 'warning')
        }
    }

    mostrarmensaje(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //SHOWING in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        },2000)

    }
}

//DOM Events
document.getElementById('producto-form')
.addEventListener('submit', function(e) {
    const nombre = document.getElementById('Nombre').value;
    const precio = document.getElementById('Precio').value;
    const año = document.getElementById('Año').value;

    const producto = new Producto(nombre, precio, año);
    const ui = new UI();
    if(nombre ==='' || precio ==='' || año === '' ) {
       return ui.mostrarmensaje('Complete los Campos Por Favor', 'danger')
    }
    ui.agregarproducto(producto)
    ui.resetForm();
    ui.mostrarmensaje('Producto Agregado Satisfactoriamente', 'success');

    e.preventDefault();
});

document.getElementById('productos-lista').addEventListener('click', function(e){
    const ui = new UI
    ui.borrarproducto(e.target)
})
