# 🧩 Prueba Técnica Frontend - Gestión de Posts

Aplicación desarrollada con **Next.js (App Router)** que permite listar, crear, editar y eliminar posts consumiendo una API externa, con manejo de estado híbrido (**React Query + Zustand**), optimización de imágenes y testing.

---

## 🛠️ Tecnologías utilizadas

* **Next.js 14+ (App Router)**
* **React**
* **TypeScript**
* **React Query (@tanstack/react-query)** → manejo de data remota
* **Zustand** → estado local (optimistic UI + persistencia)
* **React Hook Form + Zod** → manejo y validación de formularios
* **Tailwind CSS** → estilos
* **Jest + React Testing Library** → testing

---

## 📦 Instalación y ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/9alex12/reactTestDC.git
cd frontend-test
```

---

### 2. Instalar dependencias

```bash
yarn
```

---

### 3. Configurar variables de entorno

Crear archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

---

### 4. Ejecutar en desarrollo

```bash
yarn dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```

---

## 🧪 Ejecutar tests

```bash
yarn test
```

Modo watch:

```bash
yarn test -- --watch
```

---

## 🏗️ Arquitectura del proyecto

```txt
src/
 ├── app/                → rutas (Next.js App Router)
 ├── components/         → componentes reutilizables
 ├── hooks/              → lógica reutilizable (React Query)
 ├── store/              → estado global con Zustand
 ├── services/           → llamadas a API (fetch)
 ├── config/             → variables de entorno
 ├── schemas/            → validaciones con Zod
 ├── types/              → tipado global
```

---

## 🧠 Decisiones técnicas

### 🔹 React Query + Zustand (sync híbrido)

* React Query maneja el estado remoto (API)
* Zustand maneja:

  * posts creados localmente
  * eliminación optimista
  * persistencia en localStorage

👉 Esto permite simular un backend real sin depender completamente de la API.

---

### 🔹 SSR + ISR

* Se implementa **Server-Side Rendering (SSR)** en el detalle del post
* Se utiliza **ISR (revalidate: 60)** para mejorar performance

---

### 🔹 Manejo de imágenes

* Uso de `next/image` para optimización automática
* Lazy loading
* Placeholder / skeleton
* Manejo de error (fallback visual)

---

### 🔹 Formularios

* React Hook Form para performance
* Zod para validación declarativa

---

### 🔹 Testing

Se implementaron pruebas para:

* ✅ Estado global (Zustand)
* ✅ Formularios (validación + submit)
* ✅ Hooks (React Query)

---

## ✨ Funcionalidades

* 📄 Listado de posts con infinite scroll
* 🔍 Búsqueda con debounce
* ➕ Crear post
* ✏️ Editar post
* ❌ Eliminar post (optimistic UI)
* 🖼️ Visualización de imágenes
* ⚡ SSR + ISR en detalle
* 💾 Persistencia local (Zustand)

---

## 🔐 Consideraciones de seguridad

* Uso de variables de entorno (`.env`)
* Sanitización de inputs mediante validación con Zod
* Separación de lógica de acceso a datos

---

## 👨‍💻 Autor

Desarrollado por **Alexander Rincón Suarez**

---
# reactTestDC
