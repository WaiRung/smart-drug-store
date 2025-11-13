# Screenshot Script

This directory contains a Playwright-based script for automatically capturing screenshots of the main routes in the Nuxt application.

## Prerequisites

Make sure you have installed the dependencies:

```bash
yarn install
```

If you haven't installed Playwright browsers yet:

```bash
npx playwright install chromium
```

## Usage

1. **Start the development server** in one terminal:
   ```bash
   yarn dev
   ```

2. **Run the screenshot script** in another terminal:
   ```bash
   yarn take-screenshots
   ```

The script will:
- Launch a headless Chromium browser
- Navigate to each route (/, /criteria, /import, /time, /regimen/sample-document-id)
- For navigation-dependent routes, it will interact with UI elements (buttons, forms) as needed
- Capture screenshots at desktop (1440x900) and mobile (375x812) viewports
- Save screenshots to the `screenshots/` directory in the project root

## Output

Screenshots are saved with the following naming convention:
- `desktop-{route}.png` - Desktop viewport screenshots
- `mobile-{route}.png` - Mobile viewport screenshots

Example files:
- `screenshots/desktop-home.png`
- `screenshots/mobile-criteria.png`
- `screenshots/desktop-import.png`
- etc.

## Routes Covered

1. **/** (home) - Direct navigation
2. **/criteria** - Accessed by clicking "Antibiotic Dose Calculator PEDIATRICS" button
3. **/import** - Accessed by clicking "Import Data" button
4. **/time** - Direct navigation
5. **/regimen/sample-document-id** - Direct navigation with placeholder document ID

## Notes

- The `screenshots/` directory is added to `.gitignore` to prevent committing binary PNG files
- The script uses Playwright's `networkidle` wait strategy to ensure pages are fully loaded
- Some routes may show empty or initial state if they depend on data from previous user interactions
