# BillingApp — Frontend Angular

Este repositorio contiene el frontend de la aplicación de facturación, desarrollado en Angular siguiendo una arquitectura **Feature-Based con Signal Store**. Se conecta con una API REST en ASP.NET Core (Arquitectura Hexagonal) y una base de datos MongoDB.

## Tabla de Contenidos

- [Motivación y arquitectura](#motivación-y-arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Módulos y funcionalidades](#módulos-y-funcionalidades)
- [Variables de entorno](#variables-de-entorno)
- [Requisitos](#requisitos)
- [Instalación y ejecución rápida](#instalación-y-ejecución-rápida)
- [Conexión con el backend](#conexión-con-el-backend)
- [Flujo de recordatorios](#flujo-de-recordatorios)

---

## Motivación y arquitectura

- **Feature-Based**: cada dominio (`clients`, `invoices`, `dashboard`) es un módulo independiente con sus propios componentes, servicios y estado.
- **Lazy Loading**: cada feature carga su propio `*.routes.ts` bajo demanda, reduciendo el bundle inicial.
- **Signal Store (`@ngrx/signals`)**: estado reactivo por feature sin boilerplate innecesario, usando `signalStore`, `withState`, `withMethods` y `rxMethod`.
- **Standalone Components**: sin `NgModules`, todo declarado directamente en `imports[]` del componente.
- **Barrel exports**: `index.ts` en `core/` centraliza los imports compartidos.
- **Interceptores HTTP**: los headers `x-api-version` y `x-channel-id` se inyectan globalmente desde el interceptor, sin duplicación en cada servicio.

---

## Estructura del proyecto

```
src/app/
├── core/                          
│   ├── models/
│   │   ├── clients/              
│   │   ├── invoices/             
│   │   ├── dashboard/             
│   │   └── response/              
│   └── interceptors/             
│
├── shared/
│   └── Messages/                  
│
├── environments/
│   ├── environment.ts             
│   └── environment.example.ts   
│
└── features/
    ├── clients/                  
    │   ├── components/
    │   │   ├── client-form/
    │   │   ├── client-list/
    │   │   └── clients-page/
    │   ├── services/
    │   └── store/
    │
    ├── invoices/                  
    │   ├── components/
    │   │   ├── invoice-form/
    │   │   ├── invoice-list/
    │   │   ├── invoice-page/
    │   │   └── invoice-status-dialog/
    │   ├── service/
    │   └── store/
    │
    └── dashboard/                
        ├── components/
        │   ├── dashboard-page/
        │   └── summary-cards/
        ├── service/
        └── store/
```

---

## Módulos y funcionalidades

### Clients `/clients`
- Crear clientes con nombre, email, documento y teléfono
- Listar clientes con paginación

### Invoices `/invoices`
- Crear facturas asociadas a un cliente
- Listar facturas con paginación
- Actualizar el estado de una factura mediante un dialog (`PATCH /api/v1/invoices/{id}/status`)

### Dashboard `/dashboard`
- Resumen general de facturas: total, monto, agrupación por estado y por cliente
- Panel de procesamiento de recordatorios automáticos

---

## Flujo de recordatorios

El dashboard expone un botón **"Procesar Recordatorios"** que dispara:

```
POST /api/v1/billing/process-reminders
```

El backend ejecuta el siguiente flujo por cada factura:

```
Estado: primerrecordatorio
  Envía email de segundo aviso al cliente
  Actualiza estado a: segundorecordatorio

Estado: segundorecordatorio
  Ejnvía email de aviso de desactivación
  Actualiza estado a: desactivado
```

El resultado muestra cuántas facturas fueron procesadas, cuántas pasaron a segundo recordatorio y cuántas fueron desactivadas.

---

## Variables de entorno

Copia el archivo de ejemplo y asigna los valores correspondientes:

```bash
cp src/app/environments/environment.example.ts src/app/environments/environment.ts
```

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001'
};
```

---

## Requisitos

- Node.js `>= 18`
- Angular CLI `>= 17`
- Backend corriendo en `https://localhost:5001` (ver repositorio de la API)

---

## Instalación y ejecución rápida

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd billing-app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp src/app/environments/environment.example.ts src/app/environments/environment.ts

# 4. Ejecutar en desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

---

## Conexión con el backend

El frontend consume la API REST disponible en:

```
https://localhost:5001/swagger/index.html
```

Los headers requeridos por la API se inyectan globalmente mediante el interceptor HTTP:

| Header          | Valor  |
|-----------------|--------|
| `x-api-version` | `1.0`  |
| `x-channel-id`  | `TPL`  |

### Endpoints consumidos

| Método   | Endpoint                                  | Descripción                        |
|----------|-------------------------------------------|------------------------------------|
| `GET`    | `/api/v1/clients`                         | Listar clientes                    |
| `POST`   | `/api/v1/clients`                         | Crear cliente                      |
| `GET`    | `/api/v1/invoices`                        | Listar facturas                    |
| `POST`   | `/api/v1/invoices`                        | Crear factura                      |
| `PATCH`  | `/api/v1/invoices/{id}/status`            | Actualizar estado de factura       |
| `GET`    | `/api/v1/invoices/summary`               | Resumen general de facturas        |
| `POST`   | `/api/v1/billing/process-reminders`       | Procesar recordatorios automáticos |
