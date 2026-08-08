import { ConfigProvider } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { CompetitorAnalysis } from './pages/CompetitorAnalysis'
import { DemoVideo } from './pages/DemoVideo'
import { FAQ } from './pages/FAQ'
import { Guides } from './pages/Guides'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Pricing } from './pages/Pricing'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Rate } from './pages/Rate'
import { TermsOfService } from './pages/TermsOfService'
import { DentistGuide } from './pages/guides/DentistGuide'
import { GymGuide } from './pages/guides/GymGuide'
import { HotelGuide } from './pages/guides/HotelGuide'
import { RepairShopGuide } from './pages/guides/RepairShopGuide'
import { RestaurantGuide } from './pages/guides/RestaurantGuide'
import { SalonGuide } from './pages/guides/SalonGuide'
import { PhotographyGuide } from './pages/guides/PhotographyGuide'
import { RealEstateGuide } from './pages/guides/RealEstateGuide'
import { SpaWellnessGuide } from './pages/guides/SpaWellnessGuide'

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
            <Route path="guides" element={<Guides />} />
            <Route
              path="guides/restaurant-qr-code-google-reviews"
              element={<RestaurantGuide />}
            />
            <Route path="guides/how-hotels-can-win-google-reviews" element={<HotelGuide />} />
            <Route
              path="guides/turn-members-into-5-star-google-review"
              element={<GymGuide />}
            />
            <Route
              path="guides/easiest-way-salons-collect-google-reviews"
              element={<SalonGuide />}
            />
            <Route
              path="guides/dental-practices-5-star-google-reviews"
              element={<DentistGuide />}
            />
            <Route
              path="guides/mobile-laptop-repair-google-reviews"
              element={<RepairShopGuide />}
            />
            <Route
              path="guides/spa-wellness-google-reviews"
              element={<SpaWellnessGuide />}
            />
            <Route
              path="guides/real-estate-5-star-google-reviews"
              element={<RealEstateGuide />}
            />
            <Route
              path="guides/photography-google-reviews"
              element={<PhotographyGuide />}
            />
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
