import { chromium } from "@playwright/test"
import { mkdir } from "node:fs/promises"
import path from "node:path"

const outputRoot = path.resolve("/Users/user/Vibe-Coding/Projects/kavatana-portfolio/public/images/projects/phsaros")
const baseUrl = "http://127.0.0.1:3001"

const routes = [
  { name: "dashboard-desktop-light", path: "/dashboard", viewport: { width: 1440, height: 1100 }, theme: "light" },
  { name: "dashboard-desktop-dark", path: "/dashboard", viewport: { width: 1440, height: 1100 }, theme: "dark" },
  { name: "pos-desktop-light", path: "/pos", viewport: { width: 1440, height: 1100 }, theme: "light" },
  { name: "pos-desktop-dark", path: "/pos", viewport: { width: 1440, height: 1100 }, theme: "dark" },
  { name: "dashboard-mobile-light", path: "/dashboard", viewport: { width: 360, height: 800 }, theme: "light" },
  { name: "pos-mobile-light", path: "/pos", viewport: { width: 360, height: 800 }, theme: "light" },
  { name: "pos-mobile-dark", path: "/pos", viewport: { width: 360, height: 800 }, theme: "dark" },
  { name: "inventory-mobile-light", path: "/inventory", viewport: { width: 360, height: 800 }, theme: "light" },
  { name: "settings-mobile-dark", path: "/settings", viewport: { width: 360, height: 800 }, theme: "dark" }
]

async function capture() {
  await mkdir(outputRoot, { recursive: true })
  const browser = await chromium.launch()
  const context = await browser.newContext()

  for (const route of routes) {
    const page = await context.newPage()
    await page.setViewportSize(route.viewport)
    
    // Set theme cookie or localStorage if needed. The app might use `next-themes` or just check `data-theme`.
    // Let's force it via evaluate before screenshot just in case.
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(1000)

    if (route.theme === "dark") {
      // Force dark mode on the document element
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      });
    } else {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      });
    }

    await page.waitForTimeout(1500) // Let charts and animations settle
    await page.screenshot({ path: path.join(outputRoot, `phsaros-${route.name}.png`), fullPage: false })
    await page.close()
  }

  await browser.close()
}

capture().catch(console.error)
