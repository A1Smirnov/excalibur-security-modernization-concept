import { defineConfig } from '@playwright/test';
import process from 'node:process';
export default defineConfig({testDir:'./tests', use:{baseURL:'http://127.0.0.1:4321',browserName:'chromium',channel:process.env.PLAYWRIGHT_CHANNEL || undefined}, webServer:{command:'node node_modules/astro/bin/astro.mjs dev --host 127.0.0.1',env:{ASTRO_TELEMETRY_DISABLED:'1'},url:'http://127.0.0.1:4321',reuseExistingServer:true}, reporter:'list'});
