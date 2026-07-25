import { ConfigProvider } from 'antd'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { FAQ } from './pages/FAQ'
import { Home } from './pages/Home'
import { Pricing } from './pages/Pricing'

const theme = {
  token: {
    colorPrimary: '#6B2FD5',
    colorInfo: '#6B2FD5',
    colorLink: '#6B2FD5',
    borderRadius: 12,
    fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
    controlHeightLG: 44,
  },
}

export default function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
