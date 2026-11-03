from pathlib import Path
import sys

if len(sys.argv) != 2:
    raise SystemExit('Usage: python3 prepare.py /path/to/isolated-frontend-copy')
p = Path(sys.argv[1]).resolve()
f=p/'src/config/endPoints.ts'; s=f.read_text();s=s.replace('https://api.bakcrm.com/api/v1','/sample-api').replace('https://bak-uploads-001.s3.me-central-1.amazonaws.com','/sample-assets');f.write_text(s)
f=p/'src/config/firebaseConfig.ts'; f.write_text('export const firebaseConfig = {};\n')
f=p/'src/main.tsx';s=f.read_text().replace('import "./utils/debugPushNotifications"; // Load debug utility','').replace('import "./utils/socketDiagnostics"; // Load socket diagnostics utility','').replace('import "./config/firebaseInit"; // Initialize Firebase and Analytics','');f.write_text(s)
f=p/'src/App.tsx';f.write_text('''import AppRoutes from "./routes/AppRoutes";\nimport LanguageSwitchLoader from "./components/LanguageSwitchLoader";\nimport { PdfPreviewProvider } from "./context/PdfPreviewContext";\nimport { PermissionProvider } from "./contexts/PermissionContext";\nexport default function App() { return <PermissionProvider><PdfPreviewProvider><LanguageSwitchLoader/><AppRoutes/></PdfPreviewProvider></PermissionProvider>; }\n''')
f=p/'src/routes/AppRoutes.tsx';f.write_text('''import { Routes, Route, Navigate } from "react-router-dom";\nimport DashboardLayout from "@/layouts/DashboardLayout";\nimport DashboardPage from "@/pages/dashboard";\nexport default function AppRoutes() { return <Routes><Route element={<DashboardLayout/>}><Route path="/dashboard" element={<DashboardPage/>}/></Route><Route path="*" element={<Navigate to="/dashboard" replace/>}/></Routes>; }\n''')
f=p/'src/config/axios.ts';s=f.read_text().replace('import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";', 'import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";\nimport { demoAdapter } from "./demoAdapter";');s=s.replace('const apiClient = axios.create({','const apiClient = axios.create({\n   adapter: demoAdapter,');f.write_text(s)
f=p/'src/config/demoAdapter.ts';f.write_text('''import { AxiosError, type AxiosAdapter } from "axios";\n\nexport const demoAdapter: AxiosAdapter = async (config) => {\n  const path = config.url || "";\n  if (config.method?.toLowerCase() !== "get") {\n    throw new AxiosError("This sample is read-only.", "ERR_NOT_SUPPORT", config);\n  }\n  if (path.includes("/dashboard/overview")) {\n    return {config, status: 200, statusText: "OK", headers: {}, data: {data: {members:{total:48,active:45,inactive:3},attendance:{rate_percent:94,breakdown:{late_arrivals:3,day_offs:2,on_time:43}},requests:{totals:{pending:5,approved:18,rejected:2}}}}};\n  }\n  throw new AxiosError("No sample data for this view.", "ERR_BAD_REQUEST", config, undefined, {config, status:404,statusText:"Not Found",headers:{},data:{}});\n};\n''')
f=p/'vite.config.ts';f.write_text('''import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport tailwindcss from "@tailwindcss/vite";\nimport path from "path";\nexport default defineConfig({ plugins: [react(), tailwindcss()], resolve: { alias: { "@": path.resolve(__dirname, "./src") } } });\n''')
f=p/'index.html';s=f.read_text().replace('<script src="/env-config.js" vite-ignore></script>','''<div style="position:fixed;bottom:0;right:0;z-index:99999;background:#151515;color:white;font:13px Arial,sans-serif;padding:8px 12px;border-radius:6px 0 0 0">Sample data · Read-only dashboard</div>\n    <script>\n      const enc = value => btoa(JSON.stringify(value)).replaceAll("=", "").replaceAll("+", "-").replaceAll("/", "_");\n      localStorage.setItem("isLoggedIn", "true");\n      localStorage.setItem("accessToken", enc({alg:"none",typ:"JWT"})+"."+enc({sub:"1",userId:1,role:{id:1,name:"Demo Admin"},permission:[],teamIds:[],iat:1,exp:4102444800})+".demo");\n    </script>''').replace('<title>CRM</title>','<title>Amer — sample dashboard</title>');f.write_text(s)

import re
for q in [p / 'src/locales/en/common.json', p / 'src/locales/ar/common.json']:
    s = q.read_text().replace('BAK Management System', 'Amer Management System').replace('BAK', 'Amer')
    s = s.replace('Mohab Marwan', 'Demo User').replace('مهاب مروان', 'مستخدم تجريبي')
    q.write_text(s)
f = p / 'src/components/MainSidebar.tsx'
s = f.read_text().replace('DigitMask', 'Demo workspace')
s = s.replace('   const handleTabClick = (tab: string) => {\n      setActiveTab(tab);', '   const handleTabClick = (tab: string) => {\n      if (tab !== t("nav.dashboard")) { window.alert("This sample shows the dashboard only."); return; }\n      setActiveTab(tab);')
s = s.replace('                  navigate(`/dashboard/members/profile/${currentUserId || ""}`);', '                  window.alert("This sample shows the dashboard only.");')
f.write_text(s)
f = p / 'src/designSystem/HeaderActions.tsx'
f.write_text('import ColorModeSwitch from "@/designSystem/ColorModeSwitch";\nexport default function HeaderActions() { return <ColorModeSwitch/>; }\n')
f = p / 'src/components/dashboard/charts/break/BreakControlCard.tsx'
f.write_text(f.read_text().replace('disabled={isLoading || Boolean(action.disabled)}', 'disabled={true}'))
f = p / 'src/config/demoAdapter.ts'
f.write_text(f.read_text().replace('requests:{totals:{pending:5,approved:18,rejected:2}}', 'requests:{totals:{pending:5,approved:18,rejected:2},attendance:{pending:2,approved:0,rejected:0},overtime:{pending:1,approved:0,rejected:0},time_off:{pending:2,approved:0,rejected:0}}'))
f = p / 'src/index.css'
s = re.sub(r'@font-face\s*\{[^{}]*font-family:\s*"SF Pro Rounded";[^{}]*\}', '', f.read_text(), flags=re.S)
f.write_text(s.replace('"SF Pro Rounded", -apple-system, BlinkMacSystemFont', '-apple-system, BlinkMacSystemFont'))
for f in (p / 'public/fonts').glob('SF-Pro*'):
    f.unlink()
for f in (p / 'public/icons').iterdir():
    if f.name != 'defAvatar.png':
        f.unlink()
f = p / 'index.html'
f.write_text(f.read_text().replace('<link rel="icon" type="image/svg+xml" href="/vite.svg" />', ''))
