import { ConfigProvider } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { DemoVideo } from './pages/DemoVideo'
import { FAQ } from './pages/FAQ'
import { Home } from './pages/Home'
import { CompetitorAnalysis } from './pages/CompetitorAnalysis'
import { NotFound } from './pages/NotFound'
import { Pricing } from './pages/Pricing'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Rate } from './pages/Rate'
import { TermsOfService } from './pages/TermsOfService'

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
        <ScrollToTop />
        <Routes>
          <Route path="rate/:slug" element={<Rate />} />
          <Route path="demo-video" element={<DemoVideo />} />
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="competitor-analysis" element={<CompetitorAnalysis />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
