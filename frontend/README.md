# 🛒 CastillaWeb - Sistema POS e Inventario (SaaS Frontend)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

CastillaWeb es la interfaz de usuario (Frontend) de una plataforma integral de punto de venta (POS) y gestión de inventarios SaaS. Construido con tecnología web de última generación, proporciona una experiencia interactiva fluida (UX), modo oscuro adaptativo, animaciones basadas en físicas, integración con lectores de código de barras y un asistente estratégico de Inteligencia Artificial en tiempo real.

---

## 🚀 Arquitectura y Ecosistema de Frontend

La aplicación se estructura siguiendo el principio de **Diseño Atómico (Atomic Design)** para maximizar la reutilización de componentes y facilitar el mantenimiento de la interfaz:

- **Punto de Entrada**: [main.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/main.jsx) inicializa la renderización de React 19.
- **Ruteador Core**: [App.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/App.jsx) define el sistema de enrutamiento principal con `react-router-dom` v7, integrando wrappers de protección y control de suscripción.
- **Dashboard Central**: [DashboardPage.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/pages/DashboardPage.jsx) actúa como contenedor modular principal. Renderiza pestañas condicionales basadas en permisos y provee acceso al chatbot de IA.
- **Menú de Navegación**: [Sidebar.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/Sidebar.jsx) maneja la barra lateral responsiva, los menús colapsables y el selector de tema (Modo Claro / Modo Oscuro).
- **Landing Page**: [HomePage.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/pages/HomePage.jsx) funciona como portal de ventas inicial para captar nuevos registros de negocios.

---

## 🔐 Seguridad y Control de Acceso (RBAC)

El frontend asegura las vistas mediante control de acceso basado en roles y permisos (RBAC):

1. **Rutas Protegidas**: `ProtectedRoute` bloquea accesos no autenticados redirigiendo a [LoginPage.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/pages/LoginPage.jsx).
2. **Subscription Expired Lock**: El interceptor global de Axios valida el estado de la suscripción. Si ha expirado, redirige de inmediato a [SubscriptionExpiredPage.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/pages/SubscriptionExpiredPage.jsx) impidiendo cualquier operación hasta que se renueve.
3. **Guardia de Permisos**: El componente [PermissionGuard.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/PermissionGuard.jsx) oculta o muestra componentes de forma dinámica según los siguientes permisos granulares:
   - `inventory_access`: Edición y creación de productos o categorías.
   - `purchases_access`: Registrar gastos y abonos de facturas de proveedores.
   - `pos_access`: Operación del terminal Punto de Venta (caja).
   - `finances_access`: Acceso al panel analítico y chat interactivo de IA.
   - `staff_management`: Creación, edición y eliminación de empleados cajeros.
4. **Roles del Sistema**:
   - **Administrador del SaaS**: Acceso total y visualización del portal [AdminUserCreator.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/AdminUserCreator.jsx) para registrar nuevos clientes (con planes demo de 7 días) o purgar bases de datos en su zona de peligro.
   - **Cliente (Propietario / Customer)**: Históricamente representado bajo el rol `customer` (*Nota: Bug #12*). Administra su comercio sin restricciones.
   - **Empleado (Cajero)**: Limitado estrictamente a los permisos configurados en su perfil por el propietario.

---

## 📊 Módulos Clave del Sistema

### 1. Punto de Venta (TPV/POS)
El componente principal [SalesManager.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/SalesManager.jsx) gestiona toda la facturación de forma optimizada:
- **Carrito Deslizante**: El componente [CartDrawer.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/pos/CartDrawer.jsx) permite visualizar los artículos en el carrito, actualizar cantidades de productos unitarios/fraccionados y procesar el cobro.
- **Tasa de Cambio Multidivisa**: El componente [ExchangeRateBar.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/pos/ExchangeRateBar.jsx) se conecta al [currencyStore.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/store/currencyStore.js) para obtener y editar la tasa diaria de cambio USD ↔ Bs (Bolívares), mostrando totales duales a los clientes al instante.
- **Teclado POS Acelerado**: El custom hook [usePOSKeyboard.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/hooks/usePOSKeyboard.js) define atajos rápidos detallados en [HelpModal.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/pos/HelpModal.jsx) para operaciones rápidas sin mouse.
- **Filtros Históricos**: [useSalesFilters.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/hooks/useSalesFilters.js) proporciona búsquedas por vendedor, método de pago y rango de fecha rápido o personalizado.

### 2. Gestión de Inventarios y Categorías
Administración completa del stock mediante:
- **Control de Productos**: El componente [ProductManager.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/ProductManager.jsx) permite la creación de artículos con soporte de unidad de medida (ud, kg, l, m) para ventas a granel.
- **Auditoría de Ajuste**: Cuando se modifica físicamente el stock en tienda, el sistema requiere de forma obligatoria seleccionar un motivo del ajuste (mermas, robos, vencimientos, corrección) para auditoría.
- **Categorías Taxonómicas**: Controladas desde [CategoryManager.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/CategoryManager.jsx).

### 3. Registro de Compras y Cuentas por Pagar (Supplier Manager)
Control integral de los ingresos de inventario administrado por [PurchaseManager.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/PurchaseManager.jsx):
- **Cuentas por Pagar**: Controla estados de deuda con proveedores (`Pagado`, `Vencida`, `Parcial`, `Pendiente`).
- **Abonos Parciales**: Permite ir saldando facturas de compras paulatinamente mediante registro de pagos en USD.
- **Cronograma de Vencimientos**: Clasifica facturas con vencimientos futuros en base a una alerta de 7 días.

### 4. Inteligencia Artificial Estratégica
El módulo [AiChatWindow.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/organisms/AiChatWindow.jsx) ofrece una herramienta de análisis en tiempo real:
- **Respuestas por Streaming**: Utiliza la API de Streams del navegador (`ReadableStream`) mediante un canal SSE (`Server-Sent Events`) nativo para renderizar la respuesta del bot en tiempo real, palabra por palabra.
- **Integración Segura**: Configura peticiones cruzadas pasándole credenciales de cookies para mantener el contexto empresarial del cliente autenticado.

### 5. Control de Personal y Desempeño
La pestaña controlada por [StaffManager.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/StaffManager.jsx) maneja al equipo:
- **Permisos sobre la marcha**: Edición de accesos en tiempo real sobre la tarjeta del empleado.
- **Analíticas de Rendimiento**: Muestra la cantidad total de transacciones y el volumen neto facturado en USD por cada empleado.

### 6. Analíticas y Ganancia Neta
Representado en [AnalyticsManager.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/AnalyticsManager.jsx) con visualización de datos:
- **Gráficas Comparativas**: `Recharts` muestra la curva diaria de ingresos vs costos operativos (Compras).
- **Flujo de Caja**: Gráfico de barras interactivo con colorimetría condicional (naranja para rentabilidad positiva, rojo para pérdidas).

---

## ⚡ Escaneo de Códigos de Barras

El sistema soporta dos modalidades de escaneo simultáneas:
1. **Lector de Cámara**: Componente [BarcodeScanner.jsx](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/components/BarcodeScanner.jsx) que implementa `html5-qrcode`. Permite seleccionar un multiplicador rápido (1x, 2x, 5x, 10x, 20x) para cargar stock velozmente, cuenta con alertas acústicas (`AudioContext`) y táctiles (`vibrate`).
2. **Escáner Físico USB/Bluetooth**: Un escuchador global captura flujos rápidos de pulsaciones de teclado (con tolerancia de intervalo <= 50ms) terminados en `Enter`, añadiendo el producto al carrito de forma automática desde cualquier lector de mano.

---

## ⌨️ Atajos del Punto de Venta (Hotkeys)

| Atajo | Acción | Contexto |
| :--- | :--- | :--- |
| <kbd>F1</kbd> | Mostrar / ocultar ayuda de atajos | Global |
| <kbd>F2</kbd> | Crear nueva venta vacía | Historial |
| <kbd>Esc</kbd> | Cancelar venta o cerrar ventana/modal | Global |
| <kbd>F3</kbd> ó <kbd>/</kbd> | Enfocar barra de búsqueda de productos | Venta Activa |
| <kbd>F4</kbd> | Desplegar carrito de compras | Venta Activa |
| <kbd>F5</kbd> | Ciclar método de pago en el carrito | Carrito Abierto |
| <kbd>F6</kbd> | Abrir cámara escáner de barras | Venta Activa |
| <kbd>F8</kbd> | Vaciar todo el carrito | Venta Activa |
| <kbd>F9</kbd> | Confirmar pago / procesar venta | Carrito Abierto |
| <kbd>+</kbd> / <kbd>=</kbd> | Aumentar cantidad del último ítem | Venta Activa (sin foco en input) |
| <kbd>-</kbd> | Disminuir cantidad del último ítem | Venta Activa (sin foco en input) |

---

## 📂 Arquitectura de Estado Global (Zustand Stores)

El estado asincrónico del frontend se descentraliza en múltiples almacenes ligeros con persistencia selectiva:

- **[authStore.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/store/authStore.js)**: Control de usuario, token de verificación, creación administrativa y purga dura de almacenamiento local al cerrar sesión.
- **[productStore.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/store/productStore.js)**: CRUD de productos, filtrados avanzados y obtención por código de barras.
- **[categoryStore.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/store/categoryStore.js)**: Gestión taxonómica.
- **[purchaseStore.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/store/purchaseStore.js)**: Transacciones con proveedores y pagos de deuda.
- **[saleStore.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/store/saleStore.js)**: Control de ventas, anulaciones y recargas de stock asociadas.
- **[staffStore.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/store/staffStore.js)**: Gestión de cajeros, asignación de permisos y estadísticas.
- **[currencyStore.js](file:///c:/Users/Consultorio/Documents/proyectosCarlos/Dashboard-React-Tailwindcss/frontend/src/store/currencyStore.js)**: Sincronización y persistencia local de tasa cambiaria diaria (Bs/USD).

---

## 🛠️ Instalación y Servidor de Desarrollo

### 1. Requisitos Previos
- Node.js v18+ y npm / pnpm instalado.
- Servidor backend corriendo (puerto `:5000` por defecto).

### 2. Pasos de Instalación
1. Accede al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Lanza el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible en `http://localhost:5173`.*
