import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

interface MarcadorColor {
  color : string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('marcadores') marcadores!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-98.94331994047845, 19.39158707758591];
  
  //Arreglo de marcadores
  marcadoresArr: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken
    this.mapa = new mapboxgl.Map({
      container: this.marcadores.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

  }

  crearMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color    : color
    })

      .setLngLat(this.center)
      .addTo(this.mapa)
    
      this.marcadoresArr.push({
        color : color,
        marker: nuevoMarcador
      });


  }

  irMarcador(marker:mapboxgl.Marker) {

    this.mapa.flyTo({
      center: marker.getLngLat(),
      essential: true
    })

  }

}




