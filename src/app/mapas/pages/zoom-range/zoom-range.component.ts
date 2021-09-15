import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: [ './zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit{

@ViewChild('zoom') zoom!: ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel : number = 10;

  constructor() { }

  ngAfterViewInit():void{
    (mapboxgl as any).accessToken = environment.mapboxToken
    this.mapa = new mapboxgl.Map({
      container: this.zoom.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-98.94331994047845, 19.39158707758591],
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (eve) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoom', (eve) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      }
    });


  }

  zoomInt(){
    this.mapa.zoomIn();
    

  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomCambio(){
    
  }

}
