# PDF Photo Viewer

Si tienes muchos PDFs con una foto en cada uno, abrirlos uno a uno es un rollo. Esta app los carga todos de golpe (archivos sueltos o una carpeta entera) y enseña la primera página de cada uno como miniatura en una cuadrícula. Al pulsar en una se abre un visor grande con paginación y zoom.

Todo pasa en el navegador: los archivos no se suben a ningún servidor.

Web: https://pdf-viewer.danapps.dev/

## Tecnologías

- React 19 + Vite
- [react-pdf](https://github.com/wojtekmaj/react-pdf), que usa pdf.js de Mozilla por debajo
- lucide-react para los iconos

## Cómo ejecutarlo

Hace falta tener [Node.js](https://nodejs.org/) instalado.

```bash
npm install
npm run dev      # abre http://localhost:5173
npm run build    # genera la versión final en dist/
npm run lint
```

## Estructura

```
src/
  main.jsx                  punto de entrada, configura el worker de pdf.js
  App.jsx                   guarda la lista de PDFs y cuál está abierto en el visor
  components/
    FileUploader.jsx        botones para elegir archivos o una carpeta
    PDFGrid.jsx             la cuadrícula de miniaturas
    PDFThumbnail.jsx        una miniatura (solo la primera página)
    PDFViewerModal.jsx      visor a pantalla completa con páginas y zoom
    ErrorBoundary.jsx       evita que un PDF que falle rompa toda la app
```

El estado vive en `App`: la lista de archivos y el archivo seleccionado. Los componentes de abajo reciben los datos por props y avisan hacia arriba con callbacks (`onFilesSelected`, `onSelect`, `onClose`).

## Cosas que me costó resolver

- **El worker de pdf.js.** pdf.js procesa los PDF en un Web Worker para no bloquear la página, y hay que decirle dónde está ese archivo. Se hace una vez en `main.jsx` con `new URL(..., import.meta.url)`, que es como Vite sabe que tiene que incluirlo en el build.
- **Elegir una carpeta.** El input con `webkitdirectory` devuelve todos los archivos de la carpeta, también los que no son PDF, así que se filtran antes de añadirlos.
- **PDFs dañados.** Cada miniatura y el visor van dentro de un `ErrorBoundary`, así un archivo roto muestra un mensaje en su tarjeta y el resto sigue funcionando.
- **Rendimiento.** En las miniaturas se desactivan las capas de texto y de enlaces de react-pdf, porque no se usan y hacen que cargue más lento con muchos archivos.
- **Teclado.** En el visor, Esc cierra y las flechas cambian de página. El listener se añade con `useEffect` y se quita en su función de limpieza al cerrar.
