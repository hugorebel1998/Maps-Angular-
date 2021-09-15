import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('zoom') zoom!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center : [number , number ] = [-98.94331994047845, 19.39158707758591];

  constructor() { }
  
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {})
    this.mapa.off('zoomend', () => {})
    this.mapa.off('move', () => {})
    
  }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken
    this.mapa = new mapboxgl.Map({
      container: this.zoom.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //Zoom
    this.mapa.on('zoom', (even) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (even) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      }
    });

    //Movimiento
    this.mapa.on('move', (event) => {
      const target = event.target;
      const {lng, lat } = target.getCenter();
      this.center = [lng, lat];

    })


  }

  zoomInt() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zooCambio( valor: string){
    this.mapa.zoomTo(Number(valor));

  }



}
