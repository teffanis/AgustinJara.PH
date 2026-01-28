# Instrucciones para GitHub

## Pasos para crear el repositorio en GitHub

### 1. Crear un repositorio en GitHub
- Ve a [github.com](https://github.com) y accede a tu cuenta
- Haz clic en el botón "+" en la esquina superior derecha
- Selecciona "New repository"
- Nombre: `ecommerce-fotografias`
- Descripción: `Servidor ecommerce para venta de fotografías`
- Selecciona "Public" si lo deseas compartir
- NO inicialices el repositorio con README (ya lo tenemos)
- Haz clic en "Create repository"

### 2. Configurar el repositorio localmente

En tu terminal, desde la carpeta del proyecto:

```bash
cd c:\Users\MARIO ORTIZ\Documents\AgusJara.PH\ecommerce-fotografias

# Inicializar repositorio git
git init

# Agregar el remoto de GitHub (reemplaza USERNAME con tu usuario)
git remote add origin https://github.com/USERNAME/ecommerce-fotografias.git

# Agregar todos los archivos
git add .

# Crear commit inicial
git commit -m "Inicial: Servidor ecommerce de fotografías con Express"

# Cambiar rama a main (si es necesario)
git branch -M main

# Hacer push al repositorio
git push -u origin main
```

### 3. Verificación
- Ve a tu repositorio en GitHub
- Verifica que todos los archivos estén presentes
- Confirma que está excluida la carpeta `node_modules`

## Estructura que se subirá a GitHub

```
ecommerce-fotografias/
├── src/
│   ├── app.js
│   ├── managers/
│   │   ├── ProductManager.js
│   │   └── CartManager.js
│   └── routes/
│       ├── products.js
│       └── carts.js
├── data/
│   ├── products.json
│   └── carts.json
├── package.json
├── .gitignore
├── README.md
├── TESTING.md
└── Ecommerce_Fotografias_API.postman_collection.json
```

## Información del Repositorio

- **Nombre:** ecommerce-fotografias
- **Descripción:** API REST para ecommerce de fotografías
- **Tecnología:** Node.js + Express
- **Puerto:** 8080
- **Base de datos:** JSON (archivo)

## Enlace del Repositorio

Una vez subido, el repositorio estará en:
```
https://github.com/USERNAME/ecommerce-fotografias
```

Reemplaza `USERNAME` con tu nombre de usuario de GitHub.

