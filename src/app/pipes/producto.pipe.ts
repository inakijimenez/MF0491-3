import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto';

@Pipe({
  name: 'producto'
})
export class ProductoPipe implements PipeTransform {

  transform(productos: Producto[], searchText: string): Producto[] {

    if (!productos) return [];
    if (!searchText) {
      return productos;
    } else {
      searchText = searchText.toLowerCase();
      let producto = '';
      return productos.filter(it => {
        producto = it.nombre;
        producto = producto.toLowerCase();
        return producto.includes(searchText);
      });
    }
  }

}
