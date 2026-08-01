# DarlexPC Web

## Descripción

DarlexPC Web es la plataforma oficial de comercio electrónico de DarlexPC, diseñada para ofrecer un catálogo de productos tecnológicos con arquitectura modular, escalable y preparada para múltiples sucursales.

Actualmente el proyecto utiliza una arquitectura basada en HTML, CSS y JavaScript Vanilla, consumiendo APIs desarrolladas en Cloudflare Workers conectadas a Google Sheets.

---

# Estado del proyecto

Versión actual: 2.4

Estado:
En desarrollo

---

# Tecnologías

Frontend

- HTML5
- CSS3
- JavaScript ES6

Backend

- Cloudflare Workers

Base de datos

- Google Sheets

Imágenes

- Cloudinary

Hosting

- GitHub Pages

Cache

- LocalStorage

---

# Arquitectura

Cada sucursal trabaja de forma independiente.

Ejemplo:

Matriz

Google Sheets
↓

Cloudflare Worker
↓

darlexpc.com

---

Ibarra

Google Sheets
↓

Cloudflare Worker
↓

darlexpc.com/ibarra

---

# Objetivos actuales

- Mantener arquitectura Multi-Sucursal.
- Desarrollar el módulo Servicio Técnico.
- Crear Dashboard Administrativo.
- Integrar Inventario.
- Implementar Facturación.

---

# Documentación

Toda la documentación oficial del proyecto se encuentra en:

/docs

---

# Sistema de desarrollo

El proyecto utiliza la metodología SDC (Sistema de Documentación Continua).

Cada Sprint finalizado actualiza automáticamente:

- PROJECT_STATE.json
- CHANGELOG.md
- ROADMAP.md
- SPRINT correspondiente

---

Última actualización

31/07/2026