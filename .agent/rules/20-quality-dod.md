# Tita Vigo - Quality & Definition of Done

## ✅ Definition of Done (DoD)

Antes de considerar cualquier tarea como COMPLETADA:

### Code Quality
- [ ] Compila sin errores (`npm run build`)
- [ ] Sin errores de lint (`npm run lint`)
- [ ] Sin TypeScript `any` sin justificación
- [ ] Naming conventions respetadas
- [ ] Error handling implementado

### Mobile-First
- [ ] Testeado en viewport 375px
- [ ] Touch targets ≥ 44px
- [ ] Sin dependencias de hover

### API Endpoints
- [ ] Response format consistente
- [ ] Error responses con código y mensaje
- [ ] Validación con class-validator

### Frontend Pages
- [ ] Loading states implementados
- [ ] Error states implementados
- [ ] SEO básico (title, meta description)

---

## 🚫 No-Gos Absolutos

| ❌ Nunca | ✅ En su lugar |
|----------|----------------|
| Commit que no compila | Verificar build antes |
| Hardcodear secrets | Variables de entorno |
| Catch vacío | Log + manejo apropiado |
| `any` sin comentario | Tipado explícito |
| Console.log en prod | Logger service |
| Imágenes sin alt | Alt descriptivo |

---

## 🧪 Testing (Post-MVP)

### Cobertura Mínima
- Unit tests: Business logic
- Integration tests: API endpoints
- E2E: Flujo de compra crítico

### Priority List
1. CRUD productos
2. Upload de imágenes
3. Flujo WhatsApp

---

## 📋 Pre-Push Checklist

```bash
# Antes de push
npm run lint          # Sin errores
npm run build         # Compila OK
npm run test          # Tests pasan (cuando existan)
```

---

## 🔄 Code Review Focus

1. ¿Sigue los naming conventions?
2. ¿Mobile-first implementado?
3. ¿Errores manejados correctamente?
4. ¿Sin secrets hardcodeados?
5. ¿Validaciones en DTOs?
