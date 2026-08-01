# AI CONTEXT

## Filosofía

El proyecto se desarrolla mediante Sprints pequeños.

No se modifica arquitectura sin autorización.

Todo código debe entregarse listo para producción.

No se inventa código.

No se cambian nombres de archivos existentes.

Siempre se respeta la arquitectura actual.

Toda mejora debe ser incremental.

Al finalizar un Sprint se actualiza:

- PROJECT_STATE.json
- CHANGELOG.md
- ROADMAP.md

## Servicio Técnico - Contexto adquirido (Sprint S02)

El módulo Servicio Técnico nace como un sistema independiente del Ecommerce y digitaliza el proceso operativo actualmente realizado mediante formularios físicos.

La prioridad del proyecto es mantener el flujo de trabajo existente, sustituyendo únicamente el soporte en papel por un sistema digital.

Se definieron tres áreas funcionales principales:

- Recepción
- Servicio Técnico
- Despacho

Todas operan sobre una única orden de servicio.

Se aprobó utilizar estados de orden para representar el ciclo de vida completo del equipo.

Se decidió utilizar Cloudflare D1 como base de datos objetivo del módulo, manteniendo Google Sheets exclusivamente para el catálogo de productos.

Las órdenes no deberán eliminarse físicamente; únicamente podrán anularse para conservar la trazabilidad.

El desarrollo continuará siguiendo Sprints pequeños y sin modificar módulos existentes.