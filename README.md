# BORAHAE — Una sorpresa para mi amiga

Página lista para GitHub Pages, adaptable a celular y computadora.
Al pulsar **Encender el cielo**, el show comienza con el MP3 incluido desde el segundo **23**.
La pausa, el reinicio y el selector de escenas también controlan la posición de la música.

## Publicarla y obtener el enlace

1. Extrae el ZIP en tu computadora.
2. Crea un repositorio en GitHub, por ejemplo `un-cielo-para-ti`. Para GitHub Pages gratuito, utiliza un repositorio público.
3. En el repositorio, selecciona **Add file → Upload files**.
4. Sube el **contenido** de esta carpeta, conservando la carpeta `assets`. `index.html` debe estar directamente en la raíz del repositorio, no dentro de otra carpeta. No subas el ZIP sin extraer.
5. Pulsa **Commit changes**.
6. Ve a **Settings → Pages**.
7. En **Source**, selecciona **Deploy from a branch**. Elige **main** y **/ (root)**; pulsa **Save**.
8. Espera a que termine la publicación. Esa misma sección mostrará el enlace para compartir con tu amiga.

El enlace tendrá un formato como `https://TU-USUARIO.github.io/un-cielo-para-ti/`.
Es un ejemplo: el enlace real aparece después de publicar tu repositorio.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Archivos que debes subir

```text
index.html
style.css
app.js
assets/
  dynamite.mp3
.nojekyll
README.md
```

## Probar en tu computadora

Abre `index.html` con doble clic, manteniendo los demás archivos y la carpeta `assets` en su lugar.
La canción está incluida; ya no necesitas seleccionar audio ni abrir YouTube.
La reproducción empieza después de pulsar el botón, como requieren los navegadores de celular.
Si el navegador impide el sonido, aparece **Activar música** para reintentarlo.

La versión conserva el tono de amistad y la dedicatoria «Te quiero, amiga. Y seguiré intentando sacarte una sonrisa».

## Ajustar el comienzo de la canción

El inicio está configurado en `audioOffset=23` dentro de `app.js` y en `#t=23` dentro de `index.html`.
El MP3 conserva el audio original; la página salta los primeros 23 segundos al reproducir.
