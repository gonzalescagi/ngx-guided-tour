# NgxToursGuide

## Descripción

¡Bienvenido a NgxToursGuide, tu compañero virtual para descubrir cada rincón de las aplicaciones web como nunca antes! ¿Alguna vez te has sentido perdido en una aplicación web, sin saber por dónde empezar o qué hacer? ¡Con NgxToursGuide, eso es cosa del pasado! 

Imagina tener a tu disposición una guía interactiva que te lleva de la mano a través de cada característica, cada página y cada funcionalidad, explicándote todo en detalle mientras exploras. Desde el momento en que ingresas a una aplicación, NgxToursGuide te da la bienvenida con un recorrido personalizado diseñado para ti.

![Demo](https://prnt.sc/ur1-L_1AB9jJ)
[Demo](https://prnt.sc/ur1-L_1AB9jJ)

## Instalación
Para instalar esta librería en tu proyecto Angular 17, ejecuta el siguiente comando:

## Instalación
```bash
npm install ngx-guide-tour
```

## Uso
Para utilizar la librería en tu proyecto, sigue estos pasos:

1. Importa el módulo de la librería en tu aplicación:

```typescript
import { GuidedTourModule } from 'angular-guided-tour';
```

2. Asegúrate de tener configurado el componente `GuidedTourComponent` en tu HTML:

```html
<app-guided-tour #firstMessage
  [indexModule]="'HOME'"
  [modulesGuide]="modulesGuide"></app-guided-tour>
```

3. Utiliza el método `setConfiguration` para configurar aspectos como el color de fondo, el color del texto y el nombre de la aplicación:

```typescript
this.guidedTourComponent.setConfiguration({
        appName: 'Mi Aplicación',
    backgroundRGBA: '245, 66, 179,0.7',
    textColorHex:'#000000'
});
```

## Ejemplos
Aquí tienes un ejemplo de cómo puedes definir y utilizar el objeto `modulesGuide`:

```typescript
public modulesGuide: Array<IModuleGuide> = [
  {
    moduleId: 'HOME', steps: [
      { target: 'obj1', description: 'Título de bienvenida a la aplicación'},
      { target: 'obj6', description: 'Botón para ingresar a la configuraciones de la aplicación'}
    ]
  },
  {
    moduleId: 'HIJO', steps: [
      { target: 'hijo01', description: 'Botón para salir de la aplicación'},
    ]
  }
];
```

## Notas
Esta librería fue desarrollada en Angular 17 y utiliza localStorage para marcar los pasos que han sido vistos por el usuario de manera automatica. No es apto para dispositivos móviles y podría no proporcionar una buena experiencia de uso en ese entorno.


### Requisitos
+ Angular 17
+ Angular Material instalado


## Contribución
¡Contribuciones son bienvenidas! Si deseas contribuir al proyecto, por favor revisa nuestra guía de contribución y sigue los lineamientos.

## Contacto
Si tienes preguntas, sugerencias o problemas, por favor contacta al equipo de desarrollo en gonzalescagi@gmail.com o abre un issue en el repositorio.

## Licencia
Este proyecto está bajo la Licencia Apache-2.0 license. Consulta el archivo LICENSE para más detalles.

> [!WARNING]
> Este componente aun se encuentra en etapa de desarrollo
