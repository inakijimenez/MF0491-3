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

  constructor(private productosService: ProductosService) {
    console.log('SupermercadoComponent constructor');

    this.productos = [];
    this.producto = new Producto();
    
  }

  ngOnInit() {
    console.log('SupermercadoComponent ngOnInit');

    this.productos = this.productosService.getAll();
    //console.log('Productos %o', this.productos);

    
  }

}
