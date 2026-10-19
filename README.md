# 🐶 Razas de Perros

Un sitio web estático que muestra **fotos e información de más de 100 razas de perros**. Los datos de las razas se cargan desde la [Dog CEO API](https://dog.ceo/dog-api/), y la información adicional (origen, tamaño y temperamento) se lee desde un archivo local `data/breeds.json`.

El sitio está pensado para ser **servido con Docker** usando `nginx`, pero también puede levantarse sin Docker con cualquier servidor estático.

---

## ✨ ¿Qué hace?

- Lista las razas disponibles y las muestra en un selector.
- Al elegir una raza, carga **4 fotos aleatorias** desde la Dog CEO API.
- Muestra una tarjeta con **información de la raza** (origen, tamaño y temperamento).
- Diseño **responsive**, pensado para verse bien en celular y escritorio.

---

## 🚀 Requisitos previos

Para seguir esta guía solo necesitás **una** de estas dos cosas:

| Opción | Qué necesitás | Para quién es |
|--------|---------------|---------------|
| **A. Con Docker** (recomendada) | [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado | La forma más limpia y la que se solicita en el TP |
| **B. Sin Docker** | Un navegador y [Python](https://www.python.org/downloads/) (o VS Code con Live Server) | Para probar rápido sin instalar Docker |

> 💡 **¿No tenés Docker?** Descargá e instalá [Docker Desktop](https://www.docker.com/products/docker-desktop/), abrilo y esperá a que diga que está corriendo. Con eso ya alcanza.

---

## ⚡ Puesta en marcha

### Opción A — Con Docker (recomendada)

Abrí una terminal y corré estos comandos **en orden**:

```bash
# 1. Cloná el repositorio
git clone https://github.com/SbrekDev/Trabajo-Practico-Git-y-Docker-2C2026.git

# 2. Entrá a la carpeta del proyecto
cd Trabajo-Practico-Git-y-Docker-2C2026

# 3. Construí la imagen de Docker
docker build -t razas-perros .

# 4. Levantá el contenedor (mapea el puerto 80 del contenedor al 8080 de tu PC)
docker run -d -p 8080:80 --name razas-perros razas-perros
```

Después abrí tu navegador y andá a **http://localhost:8080**.

Si todo salió bien, vas a ver el sitio con el título *"Descubrí tu raza favorita"* y un selector para elegir raza.

#### Para detenerlo cuando termines

```bash
docker stop razas-perros   # detiene el contenedor
docker rm razas-perros     # lo elimina (opcional)
```

#### Para volver a levantarlo más adelante

```bash
docker run -d -p 8080:80 --name razas-perros razas-perros
```

> Si el puerto `8080` ya está ocupado, cambiá el número de la izquierda por otro, por ejemplo `-p 3000:80`, y entrá a `http://localhost:3000`.

---

### Opción B — Sin Docker

Necesitás servir los archivos con un servidor estático (abrirlos directo con doble clic **no** funciona porque el navegador bloquea la lectura del archivo local de datos).

**Con Python** (viene incluido en Mac y Linux; en Windows se instala):

```bash
# Desde la carpeta del proyecto
python -m http.server 8000
```

Y abrí **http://localhost:8000**.

**Con VS Code + Live Server:** abrí la carpeta del proyecto en VS Code, instalá la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), hacé clic derecho sobre `index.html` y elegí **"Open with Live Server"**.

---

## 🧭 Cómo usar el sitio

1. Abrí el sitio (por Docker o sin él).
2. Hacé clic en el selector del centro y **elegí una raza**.
3. Vas a ver la tarjeta con su **información** (origen, tamaño, temperamento).
4. Debajo aparecen **4 fotos** aleatorias de esa raza.
5. Elegí otra raza para cargar fotos e info nuevas.

> 🌐 El sitio necesita **conexión a internet** para traer las fotos de la Dog CEO API.

---

## 🗂️ Estructura del proyecto

```
.
├── Dockerfile            # Imagen de nginx que sirve el sitio
├── .dockerignore         # Archivos que NO van a la imagen
├── .gitignore            # Archivos que NO van a Git
├── index.html            # Estructura de la página
├── styles.css            # Estilos (diseño responsive)
├── script.js             # Lógica: pide razas y fotos a la API
└── data/
    └── breeds.json       # Información local de más de 100 razas
```

---

## 🔧 Comandos útiles

| Comando | Qué hace |
|---------|----------|
| `docker build -t razas-perros .` | Construye la imagen del sitio |
| `docker run -d -p 8080:80 razas-perros` | Levanta un contenedor en el puerto 8080 |
| `docker ps` | Lista los contenedores corriendo |
| `docker stop razas-perros` | Detiene el contenedor |
| `docker images` | Lista las imágenes locales |

---

## 📊 ¿Cómo funciona?

- La **lista de razas** se obtiene de `https://dog.ceo/api/breeds/list/all`.
- Las **fotos** se obtienen de `https://dog.ceo/api/breed/{raza}/images/random/4` (4 fotos al azar).
- La **información** (origen, tamaño, temperamento) se lee del archivo local `data/breeds.json`, porque la Dog CEO API no incluye esos datos.

---

## ❓ Solución de problemas

| Problema | Solución |
|----------|----------|
| No se cargan las fotos | Verificá que tengas conexión a internet |
| `docker build` falla | Asegurate de que Docker Desktop esté **abierto y corriendo** |
| El puerto 8080 está ocupado | Usá otro puerto, ej. `docker run -d -p 3000:80 ...` |
| No aparece la info de una raza | Esa raza puede no estar en `data/breeds.json`; la página muestra un mensaje |
| La página se ve sin estilos | Recargá con `Ctrl + F5` para limpiar caché |

---

## 📝 Créditos

- **Fotos y lista de razas:** [Dog CEO API](https://dog.ceo/dog-api/).
- **Trabajo práctico:** Ingeniería de Software — Git y Docker, ISTEA (2C2026).
