# Veterinaria San Marcos · Frontend (Parciales 2 y 3)

**Backend (Parcial 3):** https://github.com/eliasgonzalez22/veterinaria-sanmarcos-p3-backend

**Equipo:** [Equipo 1]
**Curso:** DSY1104 · Desarrollo Fullstack II · Duoc UC · 2026

## Integrantes

| Nombre | Correo institucional | GitHub |
|---|---|---|
| Elias Gonzalez Abraham Hernandez | eliaa.gonzalez@duocuc.cl | eliasgonzalez22 |
| Javier Ignacio Alegría Vargas | jav.alegria@duocuc.cl | jav-rgb |
| Sebastian Manuel Leon Rodriguez | sebas.leonr@duocuc.cl | |

## Caso

**Veterinaria San Marcos (Forma A)**, una clínica veterinaria en Rancagua que ofrece consultas, vacunación, cirugías menores, desparasitación y exámenes para perros, gatos y otras especies.

## Descripción

Aplicación web en React que permite a los dueños de mascotas revisar el catálogo de servicios de la veterinaria, registrarse e ingresar, y solicitar una cita eligiendo mascota, fecha y hora. La recepción accede a un panel de administración donde confirma las citas o propone otro horario, y gestiona el catálogo de servicios (crear, editar y eliminar). Los datos se simulan en JavaScript y se guardan en `localStorage`, sin backend.

## Aportes de desarrollo (`jav-rgb`)

- **Inicio:** incorporación de una imagen de atención veterinaria en la portada.
- **Contacto:** página con mapa y enlace a Google Maps para una ubicación veterinaria de referencia en Rancagua.
- **Ofertas:** selección de servicios destacados del catálogo, enlazados a su detalle; los precios se muestran sin inventar descuentos.
- **Blog:** dos artículos informativos con sus vistas de detalle y enlaces a fuentes veterinarias.
- **Administración de citas:** ficha imprimible con los datos de la solicitud, su estado y el valor del servicio. Es un comprobante de solicitud, no de pago.

## Aportes de desarrollo (`eliasgonzalez22`)

- **Base del proyecto:** configuración con React, Vite, React Router y React Bootstrap, y la estructura de carpetas con Atomic Design (átomos, moléculas, organismos, plantillas y páginas).
- **Catálogo:** listado de los 31 servicios con filtro por categoría, buscador, detalle de cada servicio y cálculo de precios (incluye el recargo de urgencia fuera de horario).
- **Acceso de usuarios:** formularios de ingreso y registro con validaciones, usuarios con roles (dueño y recepcionista), sesión guardada en `localStorage`, y menú que cambia según la sesión.
- **Perfil:** página para ver los datos y editar el nombre del usuario.
- **Flujo de citas:** solicitud con mascota, fecha y hora, confirmación de datos, pantalla de resultado y "Mis citas" con el estado de cada una.
- **Panel de recepción:** confirmar citas o proponer otro horario, CRUD de servicios (crear, editar y eliminar), resumen con ítems críticos, y listado de usuarios con su historial.
- **Estado y datos:** servicios con `localStorage` (`servicioService`, `usuarioService`, `citaService`) y `ServiciosContext` para compartir el catálogo en toda la app.
- **Páginas informativas:** Nosotros y Categorías.
- **Pruebas unitarias con Vitest:** pruebas de funciones, de los tres servicios y de componentes (botón, etiqueta y formulario de login), con reporte de cobertura.

## Estructura de `src`

Los componentes siguen **Atomic Design**:

```
src/
├── components/
│   ├── atoms/          Boton, CampoTexto, Selector, EtiquetaEspecie,
│   │                   EtiquetaEstadoCita, Icono
│   ├── molecules/      BuscadorServicios, CampoFormulario, FilaCita,
│   │                   SelectorFechaHora, TarjetaServicio
│   ├── organisms/      Navbar, Footer, ListaServicios, FormularioLogin,
│   │                   FormularioRegistro, FormularioSolicitudCita,
│   │                   FormularioServicio
│   └── templates/      PlantillaPublica, PlantillaAdmin
├── pages/              Inicio, Servicios, DetalleServicio, Ofertas, Blog,
│                       Contacto, Login, Registro, Agendar, Confirmacion,
│                       Resultado, MisCitas, Admin, AdminServicios,
│                       AdminServicioForm, NoEncontrada
├── context/            ServiciosContext (estado compartido del catálogo)
├── services/           servicioService, usuarioService, citaService
│                       (CRUD con localStorage)
├── hooks/              useTituloPagina
├── utils/              precios, validaciones
└── data/               servicios (catálogo inicial de 31 servicios)
```

Las pruebas (`*.test.js` / `*.test.jsx`) están junto al archivo que prueban.

## Tecnologías

- React 19 y Vite 8
- React Router 7 (navegación)
- Bootstrap 5.3 y React Bootstrap 2 (diseño responsivo)
- Vitest, Testing Library y jsdom (pruebas unitarias y cobertura)
- Axios (consumo de la API REST del backend)

## Cómo ejecutar

```bash
npm install
cp .env.example .env   # dirección del backend (VITE_API_URL)
npm run dev
```

El login, el registro, el perfil y la lista de usuarios necesitan el backend encendido
(ver su README). Si abres el frontend con el reenvío de puertos de VS Code, reenvía también el puerto 8081.

Otros comandos:

```bash
npm run test:run   # ejecuta las pruebas una vez
npm run test:cov   # pruebas con reporte de cobertura
npm run build      # genera la versión de producción
```

## Usuarios de prueba (del backend)

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@sanmarcos.cl | 123456 |
| Recepcionista | recepcion@sanmarcos.cl | 123456 |
| Dueño de mascota | dueno@sanmarcos.cl | 123456 |

También se pueden crear dueños nuevos desde `/registro`. Son datos de demostración, no cuentas reales.

## Integración con el backend (Parcial 3)

| Pieza | Archivo | Qué hace |
|---|---|---|
| Instancia de Axios | `src/services/api.js` | `baseURL` desde `VITE_API_URL`, `timeout` de 10 s, agrega `Authorization: Bearer <token>` y detecta el 401 de un token vencido. |
| Services | `src/services/authService.js`, `usuarioService.js` | Una función por operación de la API; devuelven `respuesta.data`. |
| DTO de entrada | `src/dto/auth.dto.js` | Arma el cuerpo exacto del login y del registro (sin `rol`: lo asigna el servidor). |
| Sesión | `src/services/sesionService.js`, `src/context/SesionContext.jsx` | Guarda el token, lo recupera al recargar y cierra la sesión cuando vence. |
| Rutas por rol | `src/routes/RutaProtegida.jsx`, `src/App.jsx` | Sin sesión lleva al login; con un rol sin permiso muestra "Sin permiso". |
| Mensajes de error | `src/utils/mensajesError.js` | Distingue error del servidor, tiempo agotado y falta de conexión. Sin `alert()`. |

### Dónde se guarda el token y por qué

Se guarda en **`sessionStorage`**:

- **Sobrevive a la recarga** de la página (IE3.3.2) y **se borra al cerrar la pestaña**, así no queda guardado días en el equipo, como pasaría con `localStorage`.
- **Riesgo:** un script inyectado en la página (XSS) podría leerlo. Se reduce porque React escapa el texto que muestra, no se usa `innerHTML` y el token dura 60 minutos.
- **Alternativa más segura:** una cookie `HttpOnly` emitida por el backend, que JavaScript no puede leer, pero requiere protección CSRF. Queda como mejora.
- **Al cerrar sesión o vencer el token:** se borra del navegador y la interfaz vuelve al login. Una copia ya emitida sigue siendo válida hasta su vencimiento, porque el backend no guarda una lista de tokens revocados.

### Permisos en la interfaz

| Ruta | Quién entra |
|---|---|
| `/agendar/:id`, `/confirmacion`, `/resultado`, `/mis-citas` | Dueño de mascota |
| `/admin`, `/admin/servicios`, `/admin/resumen` | Recepcionista y Administrador |
| `/admin/usuarios` | Solo Administrador |
| `/perfil` | Cualquier usuario con sesión |

Ocultar un botón o una ruta no es seguridad: el backend vuelve a comprobar el token y el rol en cada solicitud y responde 401 o 403.

## Material complementario

Carpeta de Google Drive con el ERS V2, el documento de cobertura y las capturas responsivas:
https://drive.google.com/drive/folders/1DLfZtx6ix_a1IyR5G7Z-I99Fv8B1fT5A?usp=drive_link