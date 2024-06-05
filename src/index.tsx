import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '@/shared/styles/global.css'
import './shared/i18n/i18n.ts'
import { App } from '@/app.tsx'
import { Toaster } from './ui/toaster.tsx'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
    <StrictMode>
        <App />
        <Toaster />
    </StrictMode>
)
