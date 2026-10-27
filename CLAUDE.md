# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 1. Resumen del proyecto y stack

**Tareo** es una aplicación TODO full‑stack (autenticación con JWT + CRUD de tareas). El repositorio contiene dos paquetes independientes, cada uno con su propio `package.json`:

| Carpeta | Rol | Stack principal |
|---|---|---|
| `todo-api/` | API REST | Node + Express 5, TypeScript, Prisma 7 (`prisma-client` generator) sobre PostgreSQL vía `@prisma/adapter-pg`, `bcryptjs`, `jsonwebtoken`, Jest + ts-jest + supertest |
| `todo-frontend/` | SPA | React 19, Vite 8, TypeScript, React Router 7, React Hook Form + Zod, Axios, Tailwind CSS 4, componentes shadcn sobre `@base-ui/react`, `lucide-react` |

Despliegue actual: API en Railway, frontend en Netlify (`https://tareoapp.netlify.app`). No hay monorepo tooling (workspaces, turbo); cada paquete se instala y ejecuta por separado.

### Comandos

**Backend (`cd todo-api`)**
```bash
npm run dev            # nodemon -> npx tsx ./src/app.ts (hot reload)
npm run build          # rimraf dist + prisma generate + tsc
npm start              # npx prisma db push + node dist/app.js  (usado en producción)
npm test               # jest (todos los tests)
npm run test:watch     # jest --watchAll
npm run test:coverage  # jest --coverage  -> ./coverage
npx jest src/test/auth.test.ts                 # un archivo
npx jest -t "Deberia Crear un usuario"         # un test por nombre
npx prisma generate    # regenera el client en src/generated/prisma (requerido tras cambiar schema.prisma)
npx prisma db push     # sincroniza el schema con la BD (no hay carpeta de migraciones)
```
No hay linter configurado en el backend.

**Frontend (`cd todo-frontend`)**
```bash
npm run dev       # vite dev server (localhost:5173)
npm run build     # tsc -b + vite build
npm run preview   # sirve el build
npm run lint      # eslint .
```

### Variables de entorno

- `todo-api/.env` (ver `.env.template`): `PORT`, `POSTGRES_URL` (cadena `postgresql://…`, la consume el adapter en `src/config/prisma.ts`), `JWT_SECRET`, `JWT_EXPIRES_IN`. Ojo: `schema.prisma` NO define `url` en el bloque `datasource`; la conexión llega solo por el adapter, salvo `prisma db push` que espera `DATABASE_URL`.
- `todo-frontend/.env` (ver `.env.template`): `VITE_API_URL` (base URL del backend; si falta, Axios usa `http://localhost:3000`).

---

## 2. Mapa de arquitectura (flujo de datos)

### Backend — arquitectura en capas (Route → Controller → Service → Prisma)

```
src/app.ts                     Bootstrap Express: express.json(), CORS (allowlist fija), monta routers, app.listen
  └─ routes/*.routes.ts        Define verbos/paths. tareas.routes aplica authMiddleware a TODAS las rutas
       └─ middlewares/auth.middleware.ts   Verifica "Authorization: Bearer <jwt>", decodifica, escribe req.headers['user-id']
       └─ controllers/*.controller.ts      Adapta HTTP<->dominio: lee req.body/req.params, elige status code, formatea { success, data } | { message, error }
            └─ services/*.service.ts        Lógica de negocio + acceso a datos. Hashing (bcrypt), firma de JWT, llamadas Prisma
                 └─ config/prisma.ts        Singleton PrismaClient con PrismaPg adapter
                      └─ generated/prisma/  Client generado (NO editar, NO revisar a fondo; es artefacto de build)
```

- `dtos/*.dto.ts` e `interfaces/*.interfaces.ts` son solo `interface` TypeScript (contratos de forma), sin validación en runtime.
- `src/data/tareas.data.ts` y `src/interfaces/*` son **código heredado/muerto** de la fase previa a Prisma; no participan en el flujo real.
- Los tests (`src/test/*.test.ts`) prueban la capa **service** con `jest.mock('../config/prisma')` y `jest.mock('bcryptjs')`; no hay tests de integración HTTP aunque `supertest` está instalado.

**Endpoints**
- `POST /auth/registro`, `POST /auth/login` (públicos)
- `GET /tareas`, `GET /tareas/:id`, `POST /tareas`, `PUT /tareas/:id`, `DELETE /tareas/:id` (todos tras `authMiddleware`)

**Modelos Prisma** (`todo-api/prisma/schema.prisma`)
- `Tarea { id, titulo, descripcion?, completada=false, createdAt }`
- `Usuario { id, email @unique, password, nombre, createdAt }`
- **No hay relación `Usuario ↔ Tarea`**: las tareas no tienen dueño en el modelo de datos.

### Frontend — flujo UI → API → estado

```
main.tsx  -> <AuthProvider> -> <App/>
  context/AuthContext.tsx    Fuente de verdad de sesión: token + usuario, estaAutenticado (!!token),
                             login()/logout() que escriben/leen localStorage ('token', 'nombre')
  App.tsx                    <BrowserRouter> + rutas. Rutas privadas = ternario estaAutenticado ? <Page/> : <Navigate to="/login">
  pages/
    AuthPage.tsx             Contenedor con animación; monta <Login/> y <Registro/>
    Login.tsx / Registro.tsx react-hook-form + zodResolver(schemas/auth.schema.ts) -> api/auth.api.ts -> useAuth().login()
    Dashboard.tsx            useEffect -> obtenerTareas(); métricas derivadas por .filter(); modal de creación
    Tareas.tsx               CRUD completo; estado local de tareas, filtro y búsqueda; recargarTareas() tras cada mutación
  components/
    layout.tsx               Sidebar + Navbar + <main>{children}</main>
    ModalTarea.tsx           Formulario controlado (useState local), sincroniza con prop `tarea` vía useEffect
    TareaCard.tsx            Presentacional; recibe callbacks onEditar/onEliminar/onCompletar
    ui/*                      Primitivas shadcn/base-ui (no tocar salvo diseño)
  api/
    axios.config.ts          Instancia Axios; interceptor request inyecta "Authorization: Bearer <localStorage.token>"
    auth.api.ts / tareas.api.ts   Una función por endpoint; devuelven response.data
  schemas/auth.schema.ts     Validación Zod SOLO en el cliente (email, password min 6, nombre min 2)
  types/*.types.ts           Tipos de UI (Tarea incluye createdAt: string)
```

`src/hooks/` existe pero está **vacío**: la lógica de fetching vive inline en `useEffect` dentro de cada página (patrón `cargarTareas`/`recargarTareas` duplicado en Dashboard y Tareas).

### Contrato de respuesta

El backend responde `{ success: true, data: <payload> }` en éxito y `{ message, error }` (o `{ success:false, message, error }`) en fallo, siempre con `res.status(...)`. El frontend lee `respuesta.data`. En `login`, `data` es el string del JWT.

---

## 3. Mi objetivo de aprendizaje

Estoy usando este proyecto para **entender arquitectura**, no para producir código. Me interesa, en orden:

1. **Flujo de datos**: seguir un dato concreto desde el input del usuario hasta la fila en PostgreSQL y de vuelta a la pantalla, nombrando cada capa que atraviesa y qué transforma.
2. **Seguridad**: autenticación/autorización, manejo del JWT, almacenamiento de secretos y tokens, validación de entrada, superficie de ataque, fuga de información en respuestas de error.
3. **Clean Code / patrones**: responsabilidad única por capa, acoplamiento, duplicación, dónde está la lógica de negocio, dónde debería estar.
4. **Fallos y vulnerabilidades**: bugs latentes, errores que un usuario real podría provocar, casos límite no cubiertos.

No quiero que se escriba código "por escribir" ni features nuevas.

---

## 4. Reglas de interacción para Claude

- **Actúa estrictamente como mentor y profesor de arquitectura de software.** El objetivo de cada respuesta es que yo entienda, no que el repo tenga más líneas.
- **Prohibido aplicar cambios o refactors "de golpe".** Antes de tocar cualquier archivo, explica primero el *porqué*: qué problema resuelve, qué alternativas hay y qué se gana/pierde. Espera mi confirmación explícita antes de editar.
- **No agregues funciones nuevas** ni amplíes el alcance salvo que yo lo pida directamente.
- **Cuando pregunte por un archivo concreto**, estructura la respuesta así:
  1. **Responsabilidad única** de esa capa/archivo (qué le corresponde y qué NO).
  2. **Cómo viajan los datos** a través de él: qué entra, qué transforma, qué sale y a quién se lo pasa.
  3. **Riesgos**: vulnerabilidades de seguridad, errores que un usuario podría provocar, casos límite, y deuda técnica o code smells presentes.
- Prefiere el ejemplo mínimo y la explicación conceptual sobre el parche completo.
- Si detectas algo grave, señálalo y explícalo; no lo corrijas silenciosamente.

---

## 5. Puntos de fricción ya conocidos (material de mentoría, NO corregir sin pedirlo)

Contexto útil para cualquier conversación; sirven como casos de estudio de los temas del punto 3:

- **Sin autorización por recurso**: `Tarea` no tiene `usuarioId`. `authMiddleware` valida el token y guarda `req.headers['user-id']`, pero **ningún controlador lo usa**. Cualquier usuario autenticado ve y modifica las tareas de todos.
- **Validación solo en el cliente**: las reglas Zod viven en `todo-frontend/src/schemas`. El backend confía en `req.body` y hace `as RegistroDto` / `as CrearTareaDto` sin comprobar nada en runtime.
- **Fuga de información en errores**: los controladores devuelven el objeto `error` crudo (y a veces detalles de Prisma) dentro del JSON de respuesta y lo loguean con `JSON.stringify`.
- **Token en `localStorage`**: `axios.config.ts` y `AuthContext` guardan el JWT en `localStorage` (expuesto a XSS). El `nombre` se guarda aparte en `localStorage`; al iniciar sesión en un navegador nuevo el nombre llega vacío.
- **JWT**: `login` firma con `expiresIn: '6h'` hardcodeado; `envs.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN && '6h'` es una expresión con bug (nunca toma el valor del `.env`).
- **`auth.service.registro`** hace `throw Error` (el constructor, sin `new` ni mensaje) en el catch.
- **CORS** con `credentials: true` pero la auth va por header `Authorization`, no por cookies: combinación incoherente.
- **Contrato inconsistente**: `crearTarea` (controller) exige `titulo` y `descripcion`, pero en `schema.prisma` `descripcion` es opcional.
- **Sin migraciones**: el flujo es `prisma db push` (incluido en `npm start`); no hay historial de cambios de esquema.
- `src/generated/prisma/` es artefacto de build (está versionado): no lo audites como código propio.
