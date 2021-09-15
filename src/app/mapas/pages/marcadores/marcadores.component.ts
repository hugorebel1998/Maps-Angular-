import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

interface MarcadorColor {
  color  ?: string;
  marker ?: mapboxgl.Marker;
  centro ?: [number, number]; 
 }

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit { 

  @ViewChild('marcador') marcador!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-98.94331994047845, 19.39158707758591];
  
  //Arreglo de marcadores
  marcadores: MarcadorColor[] = [];
  color: string | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken
    this.mapa = new mapboxgl.Map({
      container: this.marcador.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();

  }

  crearMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color    : color
    })

      .setLngLat(this.center)
      .addTo(this.mapa)
    
      this.marcadores.push({
        color : color,
        marker: nuevoMarcador
      });

      this.guardarMarcadoresLocalStorage();


  }

  irMarcador(marker:mapboxgl.Marker) {

    this.mapa.flyTo({
      center: marker.getLngLat(),
      essential: true
    })

  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr:MarcadorColor [] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng , lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      })
    })

    localStorage.setItem("marcadores", JSON.stringify(lngLatArr));
  }

  leerLocalStorage(){

    if ( !localStorage.getItem('marcadores')) {
     return; 
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    console.log(lngLatArr)
    
    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true

      })
      .setLngLat(m.centro!)
      .addTo(this.mapa)
      

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      })

    })

    

  }

}




