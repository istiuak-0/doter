## How it works

`OverlayService.open()` creates an `OverlayRef`, emits on the internal `OverlayBus`, and `OverlayHost` (mounted at app root) picks it up and renders the component. Calling `ref.close()` runs the handlers, cleans up the service map, and unmounts the component.

## Setup

Mount `OverlayHost` once at app root — it teleports everything to `<body>`.

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <OverlayHost />
</template>
```

---

## Usage

```typescript
const overlay = obtain(OverlayService)

// open
const ref = overlay.open(MyComponent, {
  anchor: buttonEl, // anchors position to element
  top: 8,           // offset from anchor bottom
  left: 0,
  data: { id: 123 },
})

// listen
ref.on('close', (data) => { })

// close
ref.close({ saved: true })

// toggle — returns null if it was open (closed it), returns ref if it was closed (opened it)
overlay.toggle(MyComponent, options)
```

### From inside the opened component

```typescript
const ref = obtainCtx(OverlayRef)
ref.close({ confirmed: true })
```

---

## Extending

### New options (size, modal, placement, etc.)

Add to `OverlayOptions` in `overlay.types.ts`, then consume in `OverlayInstance.vue`.

```typescript
export interface OverlayOptions {
  top?: number
  left?: number
  anchor?: Element | null
  data?: unknown
  modal?: boolean           // handle in OverlayInstance
  placement?: 'top' | 'bottom' | 'left' | 'right'
}
```

### New variant (Dialog, Popover, Drawer, etc.)

Don't add to `OverlayService` directly. Wrap it with a variant service that pre-sets the options:

```typescript
@attach()
export class DialogService {
  private overlay = obtain(OverlayService)

  open(component: Component, options: OverlayOptions = {}): OverlayRef {
    return this.overlay.open(component, { modal: true, ...options })
  }
}
```

### New bus events

Add to `OverlayBusEvents` in `overlay.types.ts` and initialize the array in `overlay-bus.ts`:

```typescript
// overlay.types.ts
export interface OverlayBusEvents {
  "overlay:open": OverlayOpenEvent
  "overlay:close": { id: string; data?: unknown }
  "overlay:update": { id: string; options: OverlayOptions } // new
}

// overlay-bus.ts
private readonly handlers: Record<string, Handler<any>[]> = {
  "overlay:open": [],
  "overlay:close": [],
  "overlay:update": [], // new
}
```

---

## Gotchas

- **Close handlers are one-shot** — cleared after `close()` fires. Re-register on every new `ref`.
- **One `OverlayHost` per app** — mounting it twice duplicates all overlays.
- **Don't use `OverlayBus` directly** — it's internal, always go through a service.
- **Anchor positioning uses `ResizeObserver`** — resize is tracked automatically, scroll is not. Add a scroll listener in `OverlayInstance.vue` if you need it.