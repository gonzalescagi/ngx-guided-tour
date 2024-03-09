import { AfterContentInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuidedTourComponent } from './guided-tour/guided-tour.component';
import { IModuleGuide } from './guided-tour/guided-tour.interface';
import { TourService } from './guided-tour/tour.service';
import { PruebaComponent } from './prueba/prueba.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GuidedTourComponent, PruebaComponent],
  providers: [TourService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'GuideTour';
  @ViewChild('firstMessage') guidedTourComponent!: GuidedTourComponent;

  public modulesGuide: Array<IModuleGuide> = [
    {
      moduleId: 'HOME', steps: [
        { target: 'obj1', description: 'Titulo de bienvenida a la aplicacion'},
        { target: 'obj6', description: 'Boton para ingresar a la configuraciones de la aplicacion'},
        { target: 'obj7', description: 'Boton para ingresar a la configuraciones de la aplicacion'},
        { target: 'obj2', description: 'Listado de links'},
        { target: 'obj3', description: 'Enlace directo al canal de Youtube'},
        { target: 'obj4', description: 'Boton para guardar los registros'},
        { target: 'obj5', description: 'Boton para salir de la aplicacion'},
      ]
    },
    {
      moduleId: 'HIJO', steps: [
        { target: 'hijo01', description: 'Boton para salir de la aplicacion'},
      ]
    }
  ]

  constructor() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.guidedTourComponent && false) {
      this.guidedTourComponent.setConfiguration({
        backgroundRGBA: '245, 66, 179,0.7',
        textColorHex:'#000000'
      });
    }
    
  }



}
