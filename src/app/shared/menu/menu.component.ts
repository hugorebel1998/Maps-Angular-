import { Component } from '@angular/core';
import { Item } from '../interfaces/mapa';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent {


  mapas: Item[] = 
  [
    {
      texto : 'Full-screen', 
      url   : './mapas/full-screen'
    },
    {
      texto : 'Marcadores', 
      url   : './mapas/marcadores'
    },
    {
      texto : 'Propiedades', 
      url   : './mapas/propiedades'
    },
    {
      texto : 'Zoom-range', 
      url   : './mapas/zoom-range'
    }

  ]



}
