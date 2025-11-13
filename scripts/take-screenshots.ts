/**
 * Playwright Screenshot Script
 * 
 * This script automatically visits main routes of the Nuxt app and captures screenshots
 * at both desktop (1440x900) and mobile (375x812) viewports.
 * 
 * Routes covered:
 * - / (home)
 * - /criteria (via clicking "Antibiotic Dose Calculator PEDIATRICS" button)
 * - /time (via navigating through criteria form)
 * - /import (via clicking "Import Data" button)
 * - /regimen/sample-document-id (direct navigation with placeholder)
 * 
 * Usage: yarn take-screenshots or npm run take-screenshots
 */

import { chromium, Browser, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(process.cwd(), 'screenshots');

// Viewport configurations
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 375, height: 812 };

/**
 * Ensure screenshots directory exists
 */
function ensureScreenshotsDir() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    console.log(`✓ Created screenshots directory: ${SCREENSHOTS_DIR}`);
  }
}

/**
 * Take screenshot at a specific viewport
 */
async function takeScreenshot(page: Page, routeName: string, viewportType: 'desktop' | 'mobile') {
  const filename = `${viewportType}-${routeName}.png`;
  const filepath = path.join(SCREENSHOTS_DIR, filename);
  
  await page.screenshot({ path: filepath, fullPage: true });
  console.log(`  ✓ Saved ${filename}`);
}

/**
 * Capture screenshots at both desktop and mobile viewports
 */
async function captureScreenshots(page: Page, routeName: string) {
  console.log(`\nCapturing screenshots for: ${routeName}`);
  
  // Desktop screenshot
  await page.setViewportSize(DESKTOP_VIEWPORT);
  await page.waitForTimeout(1000); // Wait for layout to settle
  await takeScreenshot(page, routeName, 'desktop');
  
  // Mobile screenshot
  await page.setViewportSize(MOBILE_VIEWPORT);
  await page.waitForTimeout(1000); // Wait for layout to settle
  await takeScreenshot(page, routeName, 'mobile');
}

/**
 * Navigate to home page
 */
async function visitHome(page: Page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await captureScreenshots(page, 'home');
}

/**
 * Navigate to criteria page by clicking the button
 */
async function visitCriteria(page: Page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  // Click the "Antibiotic Dose Calculator PEDIATRICS" button and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }),
    page.click('text=Antibiotic Dose Calculator PEDIATRICS')
  ]);
  
  await captureScreenshots(page, 'criteria');
}

/**
 * Navigate to import page by clicking the button
 */
async function visitImport(page: Page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  // Click the "Import Data" button and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }),
    page.click('text=Import Data')
  ]);
  
  await captureScreenshots(page, 'import');
}

/**
 * Navigate to time page
 * Note: This page may require prior state from the criteria form,
 * so we use direct navigation which may show an empty state
 */
async function visitTime(page: Page) {
  // Use direct navigation for the time page
  // The page can be accessed directly even without form submission
  await page.goto(`${BASE_URL}/time`, { waitUntil: 'networkidle' });
  await captureScreenshots(page, 'time');
}

/**
 * Navigate to regimen page with sample document ID
 */
async function visitRegimen(page: Page) {
  // Use direct navigation for the regimen page with placeholder ID
  const url = `${BASE_URL}/regimen/sample-document-id`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await captureScreenshots(page, 'regimen');
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Playwright Screenshot Script');
  console.log('='.repeat(60));
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Screenshots will be saved to: ${SCREENSHOTS_DIR}`);
  console.log('='.repeat(60));
  
  // Ensure screenshots directory exists
  ensureScreenshotsDir();
  
  let browser: Browser | null = null;
  
  try {
    // Launch browser
    console.log('\nLaunching browser...');
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Visit each route and capture screenshots
    await visitHome(page);
    await visitCriteria(page);
    await visitImport(page);
    await visitTime(page);
    await visitRegimen(page);
    
    console.log('\n' + '='.repeat(60));
    console.log('✓ All screenshots captured successfully!');
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('\n❌ Error occurred:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
main();
