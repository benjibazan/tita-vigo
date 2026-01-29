# Tita Vigo - User Flows

> Diagramas de flujo para los procesos clave

## 1. Flujo de Compra (Cliente)

```mermaid
flowchart TD
    A[Inicio / Landing] --> B{Busca Producto}
    B -->|Navega Categorías| C[Catálogo Filtrado]
    B -->|Ve Destacados| D[Detalle Producto]
    C --> D
    
    D --> E{¿Interesado?}
    E -->|No| C
    E -->|Sí| F[Click 'Comprar por WhatsApp']
    
    F --> G(Abre WhatsApp con Mensaje Pre-cargado)
    G --> H[Chat con Tita Vigo]
    
    H --> I{¿Confirma Compra?}
    I -->|Sí| J[Envío de Datos Pago/Envío]
    I -->|No| K[Follow-up (Manual)]
```

## 2. Flujo de Gestión de Producto (Admin)

```mermaid
flowchart TD
    A[Login Admin] --> B[Dashboard]
    B --> C[Productos]
    
    C --> D{Acción}
    D -->|Crear Nuevo| E[Formulario Nuevo Producto]
    D -->|Editar| F[Formulario Edición]
    D -->|Eliminar| G[Confirmar Borrado]
    
    E --> H[Subir Imágenes (Cloudinary)]
    H --> I[Llenar Datos (Nombre, Precio, Stock)]
    I --> J[Guardar]
    
    J --> K{Validación}
    K -->|Error| I
    K -->|Ok| L[Producto Publicado]
    L --> C
```

## 3. Flujo de Pedido Manual (Admin - Futuro)

```mermaid
flowchart TD
    A[Recepción Pedido WhatsApp] --> B[Verificar Stock en Admin]
    B --> C{¿Hay Stock?}
    C -->|Sí| D[Reservar Producto]
    C -->|No| E[Registrar Pedido a Proveedor]
    
    D --> F[Confirmar Pago]
    E --> F
    
    F --> G[Programar Envío]
    G --> H[Actualizar Estado (Enviado)]
```
