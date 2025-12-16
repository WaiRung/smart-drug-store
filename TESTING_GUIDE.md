# Testing Guide: Navigation Progress UI

## Overview
This guide explains how to test and verify that the navigation progress UI is working correctly.

## Prerequisites
1. Install dependencies: `yarn install` or `npm install`
2. Start the development server: `yarn dev` or `npm run dev`
3. Open browser to `http://localhost:3000`

## Test Cases

### Test 1: Home Page Navigation
**Steps:**
1. Navigate to home page (`http://localhost:3000`)
2. Click "Antibiotic Dose Calculator PEDIATRICS" button

**Expected Result:**
- ✅ Green progress bar appears at the top of the page immediately
- ✅ Progress bar advances from 0% to 100%
- ✅ Page slides to the left
- ✅ New page loads
- ✅ Progress bar disappears when complete

### Test 2: Back Button Navigation
**Steps:**
1. Navigate to any page with the navbar (e.g., `/criteria`)
2. Click the Back button (arrow icon)

**Expected Result:**
- ✅ Green progress bar appears at top
- ✅ Page slides to the right (back direction)
- ✅ Progress bar completes and disappears

### Test 3: Home Button Navigation
**Steps:**
1. Navigate to any page with the navbar
2. Click the Home button (house icon)

**Expected Result:**
- ✅ Green progress bar appears at top
- ✅ Navigation to home page occurs
- ✅ Progress bar completes and disappears

### Test 4: Table Row Navigation
**Steps:**
1. Navigate to recommended page with antibiotic list
2. Click on any antibiotic row

**Expected Result:**
- ✅ Green progress bar appears at top
- ✅ Navigation to regimen detail page occurs
- ✅ Progress bar completes and disappears

### Test 5: Info Button Navigation
**Steps:**
1. Navigate to regimen detail page
2. Click "Antibiotic Info" button

**Expected Result:**
- ✅ Green progress bar appears at top
- ✅ Navigation to info page occurs
- ✅ Progress bar completes and disappears

### Test 6: Rapid Navigation
**Steps:**
1. Navigate to any page
2. Click multiple navigation buttons quickly in succession

**Expected Result:**
- ✅ Progress bar handles rapid clicks gracefully
- ✅ No visual glitches or errors
- ✅ Final navigation completes successfully

## Visual Verification

### Progress Bar Appearance
Check that the progress bar has these characteristics:

**Position:**
- Fixed at the very top of the viewport
- Above all other content (high z-index)
- Full width of the screen

**Color:**
- Green color: `#25b09b`
- Matches the theme color used in buttons and loading components

**Animation:**
- Smooth progression from 0% to 100%
- No jumps or stutters
- Completes within ~2 seconds

**Height:**
- Thin bar (3px tall by default)
- Unobtrusive and doesn't block content

### Integration with Page Transitions
Verify that the progress bar works alongside existing animations:

**Slide Transitions:**
- Progress bar should be visible during the 0.9s slide transition
- Both animations should feel smooth and coordinated
- Progress bar should complete shortly after slide completes

## Browser Testing

Test in multiple browsers to ensure compatibility:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Common Issues and Solutions

### Issue: Progress bar not appearing
**Possible causes:**
1. JavaScript error preventing component from loading
2. CSS override hiding the component

**Debug steps:**
1. Open browser console and check for errors
2. Inspect the DOM to see if `<NuxtLoadingIndicator>` is rendered
3. Check if there are any CSS rules overriding the component

### Issue: Wrong color
**Possible causes:**
1. Color property not passed correctly
2. CSS override changing the color

**Debug steps:**
1. Inspect the progress bar element in browser dev tools
2. Check computed styles for the background color
3. Verify app.vue has `color="#25b09b"` attribute

### Issue: Progress bar completes too quickly or slowly
**Possible causes:**
1. Network speed affecting page load time
2. Default duration may need adjustment

**Debug steps:**
1. Check network tab to see actual load times
2. Consider adjusting duration prop if needed
3. Test on different network conditions

## Performance Testing

### Metrics to Check
1. **Time to Interactive (TTI)**: Should not increase
2. **First Contentful Paint (FCP)**: Should not be affected
3. **Memory Usage**: Should not increase significantly

### Tools
- Chrome DevTools Performance tab
- Lighthouse audit
- Network tab (throttling)

## Automated Testing (Future)

If you want to add automated tests, here's a sample test:

```typescript
// tests/app.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '~/app.vue'

describe('App', () => {
  it('includes NuxtLoadingIndicator', () => {
    const wrapper = mount(App)
    expect(wrapper.html()).toContain('NuxtLoadingIndicator')
  })
  
  it('has correct color for loading indicator', () => {
    const wrapper = mount(App)
    const indicator = wrapper.findComponent({ name: 'NuxtLoadingIndicator' })
    expect(indicator.props('color')).toBe('#25b09b')
  })
})
```

## Success Criteria

The implementation is successful if:
1. ✅ Progress bar appears on all navigation actions
2. ✅ Color matches app theme (green #25b09b)
3. ✅ No JavaScript errors in console
4. ✅ Works with existing page transitions
5. ✅ Responsive on mobile devices
6. ✅ No performance degradation
7. ✅ User feedback is positive

## Rollback Plan

If issues are discovered:
1. Revert the change to app.vue
2. Remove the single line: `<NuxtLoadingIndicator color="#25b09b" />`
3. App will function as before without the progress indicator

## Notes

- The NuxtLoadingIndicator is a built-in Nuxt component
- No external dependencies added
- Minimal code change (1 line in app.vue)
- Works automatically with all existing navigation
- Can be customized further if needed (see NAVIGATION_PROGRESS_UI.md)

## Support

For more information:
- Nuxt Documentation: https://nuxt.com/docs/api/components/nuxt-loading-indicator
- Project Documentation: See NAVIGATION_PROGRESS_UI.md
- Visual Guide: See VISUAL_GUIDE.md
