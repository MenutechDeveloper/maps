import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        # Absolute path for the local file
        path = os.path.abspath('docs/maps.html')
        await page.goto(f'file://{path}')
        await page.wait_for_timeout(2000) # Wait for map

        # 1. Map View
        await page.screenshot(path='screenshots/view_1_map.png')
        print("Captured Map View")

        # 2. List View
        await page.click('button:has-text("Locales")')
        await page.wait_for_timeout(500)
        await page.screenshot(path='screenshots/view_2_list.png')
        print("Captured List View")

        # 3. Services View
        await page.click('button:has-text("Servicios")')
        await page.wait_for_timeout(500)
        await page.screenshot(path='screenshots/view_3_services.png')
        print("Captured Services View")

        # 4. Perform a visit registration
        await page.click('button:has-text("Locales")')
        # Open modal for second item (Los Chilaquiles)
        await page.click('#business-2 .visit-btn')
        await page.wait_for_selector('.modal-overlay.active')

        await page.select_option('#visit-status', 'appointment')
        await page.fill('#visit-notes', 'Hablamos con el gerente, cita el martes.')
        await page.screenshot(path='screenshots/view_4_registration_modal.png')

        await page.click('button[type="submit"]')
        await page.wait_for_timeout(1000)

        # Verify update in list
        await page.screenshot(path='screenshots/view_5_list_updated.png')
        print("Captured List Updated")

        # Verify update in map
        await page.click('button:has-text("Mapa")')
        await page.wait_for_timeout(1000)
        await page.screenshot(path='screenshots/view_6_map_updated.png')
        print("Captured Map Updated")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(run())
