import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { MOCKS_PRODUCTOS } from './mock.productos';

@Injectable()
export class ProductosService {

  productos: Producto[];

  constructor() {
    console.log('ProductosService constructor');

    this.productos=[]
    
   }

   /**
    * Metodo para recoges todos los productos del mock y devolverlos al componente
    */
   getAll(): Producto[]{
    console.log('ProductosService getAll');

    this.productos = [];

    let jsonData = JSON.parse(MOCKS_PRODUCTOS);

    jsonData.forEach( p => {
      this.productos.push(p);
    });

    return this.productos;
   }

}
