import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
export default defineConfig({base:'/demos/inventory/',plugins:[react()],resolve:{alias:{'@':path.resolve(__dirname,'src')}},build:{outDir:'portfolio-dist'}});
