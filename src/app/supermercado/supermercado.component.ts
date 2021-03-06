import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../providers/productos.service';
import { Producto } from '../models/producto';


@Component({
  selector: 'app-supermercado',
  templateUrl: './supermercado.component.html',
  styleUrls: ['./supermercado.component.scss']
})
export class SupermercadoComponent implements OnInit {

  productos: Producto[];
  producto: Producto;
  precioOferta: number;
  carrito: Producto[];
  productosTotales: number;
  precioTotal: number;


  constructor(private productosService: ProductosService) {
    console.log('SupermercadoComponent constructor');

    this.productos = [];
    this.producto = new Producto();
    this.carrito = [];
    this.productosTotales = 0;
    this.precioTotal = 0;

  }

  ngOnInit() {
    console.log('SupermercadoComponent ngOnInit');

    this.productos = this.productosService.getAll();

  }

  //suma 1 a la cantidad del producto
  sumar(producto) {
    producto.cantidad++;

    console.log('prod %o', producto.cantidad);
  }

  //resta uno a la cantidad del producto siempre que no sea menor de uno
  restar(producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  //Metodo para añadir cantidad al producto existente en el carrito o nuevo producto si no existe
  addProducto(producto) {

    console.log('prod %o', producto.cantidad);

    let added: boolean = false;
    this.carrito.forEach(p => {
      if (p.id == producto.id) {
        p.cantidad = p.cantidad + producto.cantidad;
        added = true;
      }
    });
    if (!added) {
      this.nuevoProducto(producto);
    }

    this.calcularTotales();

    producto.cantidad = 1;
    console.log('carrito %o', this.carrito);
  }

  //Metodo para añadir el producto al carrito pq al hacer push(producto) lo añade por referencia
  //El precio se calcula sobre la oferta al pasarlo al carrito
  nuevoProducto(producto) {
    let p = new Producto();
    p.id = producto.id;
    p.cantidad = producto.cantidad;
    p.img = producto.img;
    p.nombre = producto.nombre;
    p.oferta = producto.oferta;
    if (p.oferta > 0) {
      p.precio = parseFloat((producto.precio - (producto.precio * (p.oferta / 100))).toFixed(2));
    } else {
      p.precio = producto.precio;
    }
    p.precioUnitario = producto.precioUnitario;

    this.carrito.push(p);
  }

  //Metodo para calcular el numero de productos y el precio de estos en el carrito
  calcularTotales() {
    this.productosTotales = 0;
    this.precioTotal = 0;
    let precioOferta = 0;
    this.carrito.forEach(p => {
      this.productosTotales += p.cantidad;
      this.precioTotal += parseFloat((p.precio * p.cantidad).toFixed(2));
    });
  }

  //metodo para eliminar productos del carrito
  restarCarrito(producto) {
    producto.cantidad--;
    if (producto.cantidad <= 0) {
      this.eliminarProducto(producto);
    }
  }

  //metodo para quitar productos del carrito
  eliminarProducto(producto) {
    this.carrito = this.carrito.filter(p => {
      return (p.id != producto.id);
    });
    this.calcularTotales();
  }

  //metodo para vaciar el carrito
  vaciarCesta() {
    this.carrito = [];
  }
}
