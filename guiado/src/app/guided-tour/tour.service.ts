import { Injectable } from '@angular/core';
import { IConfigurationGuide, IGuide, IModuleGuide } from './guided-tour.interface';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  steps: any[] = [];
  currentStepIndex = 0;
  configurationsGuide: IConfigurationGuide = {};

  constructor() {
    this.setConfiguration();
  }

  addStep(step: string) {
    this.steps.push(step);
  }

  startTour(idModule: IModuleGuide) {
    const storedValue = localStorage.getItem(this.configurationsGuide?.aplication || 'APLICATION-GUIDE-TOUR');
    if (storedValue) {
      const valueList: Array<IModuleGuide> = JSON.parse(storedValue);
      valueList.find(e => e.moduleId === idModule.moduleId && e.stateGuide === true) ? this.endTour(idModule) : null;
    }
  }

  nextStep(idModule: IModuleGuide, currentTargetElementId: any) {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    }
    if (currentTargetElementId?.target) {
      let target: IGuide = currentTargetElementId as IGuide;
      this.positionButtonNextToElement(target.target);
      this.setDescription(target.description);
      target.stateGuide = true;
      this.setLocalStorageTourStep(idModule, target);
    } else {
      this.endTour(idModule);
    }

  }

  private endTour(idModule: IModuleGuide): void {
    const obj = document.querySelector('.fondo-con-agujero') as HTMLElement;
    const text = document.querySelector('.shape-outside') as HTMLElement;
    if (obj) obj.style.display = 'none';
    if (text) text.style.display = 'none';
    this.setEndModule(idModule);
  }

  private setDescription(description: string) {
    const desDom = document.getElementById('description');
    if (desDom) {
      desDom.innerText = description;
    }

  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }


  positionButtonNextToElement(targetElementId: string) {

    const button = document.getElementById('bt');//TODO mejorar esta parte no es necesario que se pase el id del boton
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      let color = this.configurationsGuide.backgroundRGBA || '#0ff';
      targetElement.style.filter = `drop-shadow(0px 0px 12px rgba(${color}))`;
      setTimeout(() => {
        targetElement.style.filter = '';
      }, 2000)
    }
    if (button && targetElement) {
      const targetElementRect = targetElement.getBoundingClientRect();
      // Calcula la posición del botón
      const buttonX = targetElementRect.left + 10; // Por ejemplo, 10px a la derecha del elemento
      const buttonY = targetElementRect.top; // Mantiene la misma altura que el elemento

      // Establece las coordenadas del botón
      button.style.position = 'absolute';
      button.style.left = buttonX + 'px';
      button.style.top = buttonY + 'px';
      this.ad(targetElementId);
    } else {
      console.error('Elemento o botón no encontrado.');
    }

  }


  ad(id: any) {
    // Selecciona el input con el ID 'buscame'
    const elementoObjetivo = document.getElementById(id);

    // Si el elemento objetivo existe
    if (elementoObjetivo) {
      // Calcula la posición del elemento objetivo
      const objetivoRect = elementoObjetivo.getBoundingClientRect();

      // Calcula la posición del agujero para que esté centrado en el elemento objetivo

      // Crea un nuevo estilo para el agujero
      const nuevoEstiloAgujero = document.createElement('style');
      nuevoEstiloAgujero.innerHTML = `
    .fondo-con-agujero::before {
      top: ${objetivoRect.top + objetivoRect.height / 2}px;
      left: ${objetivoRect.left + objetivoRect.width / 2}px;
    }`;

      const t = document.createElement('style');
      const sc = document.createElement('style');
      const objCuadrado = document.querySelector('.fondo-con-agujero');
      const objCuadradoRec = objCuadrado?.getBoundingClientRect();

      if (objCuadradoRec) {
        sc.innerHTML = `
    .circulo {
      top: ${objetivoRect.top + objetivoRect.height / 2}px;
      left: ${objetivoRect.left + objetivoRect.width / 2}px;
    }
  `;
      }
      let pTop = 0;
      let pLeft = 0;
      if ((objetivoRect.left + (objetivoRect.width / 2)) + 200 >= (objCuadradoRec?.width ? objCuadradoRec.width : 9999)) {

        if ((objetivoRect.top + (objetivoRect.width / 2)) - 200 <= 0) {
          pTop = 200;
        } else if ((objetivoRect.top + (objetivoRect.width / 2)) + 200 >= (objCuadradoRec?.height ? objCuadradoRec?.height : 9999)) {
          pTop = (objCuadradoRec?.height ? objCuadradoRec?.height : 9999) - 150;
        } else {
          pTop = objetivoRect.top + objetivoRect.height / 2;
        }
        pLeft = (objCuadradoRec?.width ? objCuadradoRec.width : 9999) - 350;
      } else if ((objetivoRect.left + (objetivoRect.width / 2)) - 200 <= 0) {

        if ((objetivoRect.top + (objetivoRect.width / 2)) - 200 <= 0) {//arriba
          pTop = 200;
        } else if ((objetivoRect.top + (objetivoRect.width / 2)) + 200 >= (objCuadradoRec?.height ? objCuadradoRec?.height : 9999)) {
          //abajo
          pTop = (objCuadradoRec?.height ? objCuadradoRec?.height : 9999) - 150;
        } else {
          pTop = objetivoRect.top + objetivoRect.height / 2;
        }

        //pTop=objetivoRect.top + objetivoRect.height / 2;
        pLeft = 100;
      } else {
        pTop = objetivoRect.top + objetivoRect.height / 2;
        pLeft = objetivoRect.left + objetivoRect.width / 2;
      }
      t.innerHTML = `
        .shape-outside {
          top: ${pTop}px;
          left: ${pLeft}px;
        }`;
      // Agrega el nuevo estilo al head del documento
      document.head.appendChild(sc);
      document.head.appendChild(nuevoEstiloAgujero);
      document.head.appendChild(t);
    } else {
      console.error('Elemento objetivo no encontrado.');
      const obj = document.querySelector('.fondo-con-agujero') as HTMLElement;
      if (obj) obj.style.display = 'none';
    }

  }

  public setConfiguration(): void {
    //setea los estilos
    const nuevoEstiloAgujero = document.createElement('style');

    if (this.configurationsGuide) {
      nuevoEstiloAgujero.innerHTML = `
          .fondo-con-agujero::before {
            border: 3000px solid rgba(${this.configurationsGuide.backgroundRGBA || '0, 0, 255, 0.45'})!important;
            box-shadow: 0 0 0 2000px rgba(${this.configurationsGuide.backgroundRGBA || '0, 0, 255, 0.45'})!important;
          }
          .button-guide{
            color: ${this.configurationsGuide.textColorHex || '#ffffff'};
          }
          .description-guide{
            color: ${this.configurationsGuide.textColorHex || '#ffffff'};
          }
          `;
    } else {
      nuevoEstiloAgujero.innerHTML = `
      .fondo-con-agujero::before {
        border: 3000px solid rgba(0, 0, 255, 0.45)!important;
        box-shadow: 0 0 0 2000px rgba(0, 0, 255, 0.45)!important;
      }
      .button-guide{ color: #fff;}
      `;
    }
    document.head.appendChild(nuevoEstiloAgujero);
  }

  private setLocalStorageTourStep(idModule: IModuleGuide, stepGuide: IGuide): void {
    let listDataGuide = [];
    let dataGuide: IModuleGuide = {
      moduleId: idModule.moduleId,
      steps: [],
      stateGuide: idModule.stateGuide
    };
    dataGuide.steps.push(stepGuide);


    const storedValue = localStorage.getItem(this.configurationsGuide?.aplication || 'APLICATION-GUIDE-TOUR');
    if (storedValue) {
      // Convertir el valor de cadena JSON a un array
      const valueList: Array<IModuleGuide> = JSON.parse(storedValue);
      // Modificar el array como sea necesario
      if (valueList?.find(e => e.moduleId === idModule.moduleId)) {
        valueList.forEach(e => {
          if (e.moduleId === idModule.moduleId) {
            let fund = false;
            e.steps.forEach(stp => {
              if (stp.target === stepGuide.target) {
                stp.stateGuide = true;
                fund = true;
              }
            })
            if (!fund) {
              stepGuide.stateGuide = true;
              e.steps.push(stepGuide)
            }
          }
        })
      } else {
        //no se encontro el moduleID en el objeto guardado y e debe agregar el nuevo modulo
        listDataGuide.push(dataGuide);
      }

      // Convertir el array modificado de vuelta a una cadena JSON
      const updatedValue = JSON.stringify(valueList);
      // Almacenar el valor actualizado en el localStorage
      localStorage.setItem(this.configurationsGuide?.aplication || 'APLICATION-GUIDE-TOUR', updatedValue);

    } else {
      //'No se encontraron datos en el almacenamiento local para la clave especificada'
      listDataGuide.push(dataGuide);
      localStorage.setItem(this.configurationsGuide?.aplication || 'APLICATION-GUIDE-TOUR', JSON.stringify(listDataGuide));
    }

  }

  private setEndModule(idModule: IModuleGuide) {
    const storedValue = localStorage.getItem(this.configurationsGuide?.aplication || 'APLICATION-GUIDE-TOUR');
    if (storedValue) {
      const valueList: Array<IModuleGuide> = JSON.parse(storedValue);
      // Modificar el array como sea necesario
      valueList?.forEach(e => {
        if (e.moduleId === idModule.moduleId) e.stateGuide = true
      });
      localStorage.setItem(this.configurationsGuide?.aplication || 'APLICATION-GUIDE-TOUR', JSON.stringify(valueList));
    }
  }

  public getStateStepGuide(idModule: string, target: string): boolean {
    const storedValue = localStorage.getItem(this.configurationsGuide?.aplication || 'APLICATION-GUIDE-TOUR');
    let value: boolean = false;
    if (storedValue) {
      const valueList: Array<IModuleGuide> = JSON.parse(storedValue);
      valueList?.forEach(e => {
        if (e.moduleId === idModule) value = e.steps.find(st => st.target === target)?.stateGuide || false;
      });
    }

    return value;
  }
}
