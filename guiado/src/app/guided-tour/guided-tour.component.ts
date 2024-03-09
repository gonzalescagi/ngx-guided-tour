import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IConfigurationGuide, IModuleGuide } from './guided-tour.interface';
import { TourService } from './tour.service';

@Component({
  selector: 'app-guided-tour',
  standalone: true,
  imports: [],
  providers: [TourService],
  templateUrl: './guided-tour.component.html',
  styleUrl: './guided-tour.component.css'
})
export class GuidedTourComponent implements OnChanges {
  @Input('modulesGuide') modulesGuide: Array<IModuleGuide> = [];
  @Input('indexModule') indexModule: string = '';

  currenModule: string = '';
  currentStep: string = '';
  indice = 0;

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    this.currenModule = this.indexModule;
    this.tourService.startTour({moduleId:this.currenModule,steps:[]});

  }

  ngAfterViewInit(): void {
    this.setConfiguration();
    this.nextStep()
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['indexModule'].currentValue !== changes['indexModule'].previousValue) {
      this.currenModule = changes['indexModule'].currentValue;
    }

  }

  public nextStep(): void {
    this.indice++;
    let module = this.modulesGuide?.find(module => module.moduleId === this.currenModule);
    if(!module){
      console.log('No se encontro el modulo');
      return
    }
    let element = module?.steps[this.indice - 1];
    if(this.tourService.getStateStepGuide(this.currenModule,element?.target)) {
      this.nextStep();
      return;
    }else{
      console.log('FIN DEL GUIADO');
    }
    if (element == undefined || element == null) this.indice = 0;
    this.tourService.nextStep(module, element);
  }

  public previoStep(): void {
    this.indice--;
    let element = this.modulesGuide?.find(module => module.moduleId === this.currenModule)?.steps[this.indice - 1];
    if (element == undefined || element == null) {
      this.indice = 1;
    } else this.tourService.nextStep(this.modulesGuide[0], element);
  }

  public prevStep(): void {
    this.tourService.prevStep();
  }

  public setStep(data: Array<IModuleGuide>) {
    this.modulesGuide = data;
  }

  public setConfiguration(_configurationsGuide?: IConfigurationGuide){
    if(_configurationsGuide){
      this.tourService.configurationsGuide = _configurationsGuide;
    }
    this.tourService.setConfiguration();
  }

}
