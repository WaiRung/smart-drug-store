# Visual Guide: Navigation Progress UI

## Before and After

### Before (Without Loading Indicator)
```
┌─────────────────────────────────────┐
│                                     │
│   User clicks navigation button    │
│                                     │
│   ❌ No visual feedback             │
│   ❌ User unsure if click worked    │
│   ❌ Only see page transition       │
│                                     │
└─────────────────────────────────────┘
```

### After (With Loading Indicator)
```
┌─────────────────────────────────────┐
│ ████████████░░░░░░░░░░░░  (60%)    │  ← Green progress bar
├─────────────────────────────────────┤
│                                     │
│   User clicks navigation button    │
│                                     │
│   ✅ Immediate visual feedback      │
│   ✅ Progress bar shows loading     │
│   ✅ Smooth with page transition    │
│                                     │
└─────────────────────────────────────┘
```

## Code Change

### app.vue
```diff
  <template>
    <Title>AntiBiotics Website</Title>
+   <NuxtLoadingIndicator color="#25b09b" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </template>
```

## How It Looks

The NuxtLoadingIndicator appears as a thin progress bar at the very top of the page:

```
┌────────────────────────────────────────────────┐
│ ████████████████████░░░░░░░░░░░░░░░░░ (75%)  │ ← 3px tall green bar
├────────────────────────────────────────────────┤
│                                                │
│  [←]        [🏠]        [⟳]         ← Navbar  │
│                                                │
│           Page Content Here                    │
│                                                │
└────────────────────────────────────────────────┘
```

## User Experience Timeline

1. **T=0ms**: User clicks navigation button (e.g., "Antibiotic Dose Calculator")
2. **T=0ms**: Green progress bar appears at top and starts at 0%
3. **T=0-900ms**: Progress bar advances while page slides out
4. **T=900ms**: New page slides in
5. **T=900-2000ms**: Progress bar completes to 100%
6. **T=2000ms**: Progress bar fades away

## Properties

- **Color**: `#25b09b` (matches app theme green)
- **Height**: 3px (default, thin and unobtrusive)
- **Duration**: 2000ms (default)
- **Position**: Fixed at top of viewport
- **Z-index**: High (appears above all content)

## Navigation Points That Show Loading

All of these will automatically show the loading indicator:

### Home Page (`/`)
- "Antibiotic Dose Calculator PEDIATRICS" button → `/criteria`
- "Import Data" button → `/import`

### Criteria Page (`/criteria`)
- Back button → previous page
- Home button → `/`
- Refresh button → `/criteria`
- Any antibiotic selection → `/recommended`

### Recommended Page (`/recommended`)
- Back button → `/criteria`
- Home button → `/`
- Antibiotic row click → `/regimen/[id]`

### Regimen Page (`/regimen/[id]`)
- Back button → `/recommended`
- Home button → `/`
- "Antibiotic Info" button → `/info/[id]`
- "Dose Calculator" button → `/time`

### Info Pages (`/info/[id]/*`)
- All navigation buttons
- All tab switches

## Technical Details

### Automatic Integration
The NuxtLoadingIndicator works automatically with:
- `navigateTo('/path')`
- `navigateTo({ path: '/path' })`
- `router.push('/path')`
- `router.back()`
- `<NuxtLink to="/path">` clicks

### No Additional Code Required
All existing navigation code continues to work without any modifications:

```javascript
// These all show the loading indicator automatically
await navigateTo('/criteria')
router.back()
navigateTo({ path: '/time' })
```

## Browser Support

Works in all modern browsers that Nuxt supports:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- **Lightweight**: ~1KB (built into Nuxt)
- **No external dependencies**
- **GPU accelerated** (uses CSS transforms)
- **Minimal CPU usage**

## Accessibility

- Visual indicator only (doesn't interfere with screen readers)
- High contrast (green on white background)
- Smooth animations (reduced motion respected if user prefers)
