# Navigation Progress UI Implementation

## Overview
Added a loading progress indicator that displays during page navigation to provide visual feedback to users when navigation buttons are clicked.

## Changes Made

### 1. Added NuxtLoadingIndicator Component (app.vue)
The `NuxtLoadingIndicator` component has been added to the root `app.vue` file to show a progress bar at the top of the page during navigation.

```vue
<template>
  <Title>AntiBiotics Website</Title>
  <NuxtLoadingIndicator color="#25b09b" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

## How It Works

### NuxtLoadingIndicator
The `NuxtLoadingIndicator` is a built-in Nuxt component that:
- Automatically appears when navigation starts
- Shows a progress bar at the top of the page
- Completes when the page finishes loading
- Works seamlessly with Nuxt's routing system

### Color Customization
The loading indicator uses `#25b09b` (green), which matches the app's theme color found in:
- Button colors throughout the app
- The Loadingsquare component (`app/components/landing/Loadingsquare.vue`)

### Integration with Existing Transitions
The loading indicator works alongside the existing page transitions:
- **Slide transitions**: The app already has slide-left and slide-right transitions (0.9s duration)
- **Loading indicator**: Appears at the top of the screen during the route change
- **User experience**: Users see both the loading bar and the smooth slide transition

## User Experience Flow

1. **User clicks a navigation button** (Back, Home, or any page link)
2. **Loading indicator appears** - A green progress bar starts at the top of the page
3. **Page transition begins** - The current page slides out while the loading bar progresses
4. **New page loads** - The new page slides in
5. **Loading indicator completes** - The progress bar reaches 100% and disappears

## Benefits

1. **Immediate Feedback**: Users know their click was registered
2. **Progress Visibility**: The loading bar shows that navigation is in progress
3. **No Code Changes Required**: Works automatically with all existing `navigateTo()` and `router.back()` calls
4. **Lightweight**: Uses Nuxt's built-in component, no additional dependencies
5. **Consistent Experience**: Same loading indicator across all navigation actions

## Technical Details

### Affected Navigation Points
The loading indicator automatically works with all navigation in the app, including:
- Home/Back/Refresh buttons in `app/components/home/Navbar.vue`
- Navigation to criteria page in `app/components/home/Buttons.vue`
- Navigation to regimen details in `app/components/recommended/Table.vue`
- Navigation to info pages in `app/components/regimen/Buttons.vue`
- All other `navigateTo()` and `router.back()` calls

### No Changes Required to Existing Code
The existing navigation code continues to work as-is. For example:
```javascript
// This already shows the loading indicator automatically
await navigateTo('/criteria')

// This also shows the loading indicator automatically
router.back()
```

## Customization Options (Future)

If needed, the loading indicator can be further customized:

```vue
<!-- Additional customization options -->
<NuxtLoadingIndicator 
  color="#25b09b"      <!-- Progress bar color -->
  :height="3"          <!-- Height in pixels (default: 3) -->
  :duration="2000"     <!-- Duration in ms (default: 2000) -->
  :throttle="200"      <!-- Throttle in ms (default: 200) -->
/>
```

## Testing

To test the loading indicator:
1. Run the development server: `yarn dev`
2. Navigate to the home page
3. Click any navigation button (e.g., "Antibiotic Dose Calculator")
4. Observe the green progress bar at the top of the page
5. Notice it completes as the new page loads

## References
- [Nuxt Loading Indicator Documentation](https://nuxt.com/docs/api/components/nuxt-loading-indicator)
- [Nuxt Page Transitions](https://nuxt.com/docs/getting-started/transitions)
