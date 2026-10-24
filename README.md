# Veterinaria San Marcos · Parcial 2

**Equipo:** [Equipo 1]
**Curso:** DSY1104 · Desarrollo Fullstack II · Duoc UC · 2026

## Integrantes

| Nombre | Correo institucional | GitHub |
|---|---|---|
| Elias Gonzalez Abraham Hernandez | eliaa.gonzalez@duocuc.cl | eliasgonzalez22 |
| [NOMBRE DE TU COMPAÑERO] | [CORREO@duocuc.cl] | jav-rgb |

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

## Cómo ejecutar

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run test:run   # ejecuta las pruebas una vez
npm run test:cov   # pruebas con reporte de cobertura
npm run build      # genera la versión de producción
```

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Dueño | dueno@sanmarcos.cl | 123456 |
| Recepcionista (admin) | recepcion@sanmarcos.cl | 123456 |

También se pueden crear dueños nuevos desde `/registro`.

## Material complementario

Carpeta de Google Drive con el ERS V2, el documento de cobertura y las capturas responsivas:
[https://drive.google.com/drive/folders/1DLfZtx6ix_a1IyR5G7Z-I99Fv8B1fT5A?usp=sharing]