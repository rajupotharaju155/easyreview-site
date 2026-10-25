import { ConfigProvider } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { ClaimQr } from './pages/ClaimQr'
import { CompetitorAnalysis } from './pages/CompetitorAnalysis'
import { Contact } from './pages/Contact'
import { DemoVideo } from './pages/DemoVideo'
import { FAQ } from './pages/FAQ'
import { Guides } from './pages/Guides'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Pricing } from './pages/Pricing'
import { ProductPage } from './pages/ProductPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Profile } from './pages/Profile'
import { Rate } from './pages/Rate'
import { Menu } from './pages/Menu'
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
          <Route path="menu/:slug" element={<Menu />} />
          <Route path="profile/:slug" element={<Profile />} />
          <Route path="q/:code" element={<ClaimQr />} />
          <Route path="demo-video" element={<DemoVideo />} />
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="products/easy-menu" element={<ProductPage productId="easy-menu" />} />
            <Route path="products/easy-story" element={<ProductPage productId="easy-story" />} />
            <Route
              path="products/easy-profile"
              element={<ProductPage productId="easy-profile" />}
            />
            <Route path="products/easy-cash" element={<ProductPage productId="easy-cash" />} />
            <Route path="competitor-analysis" element={<CompetitorAnalysis />} />
            <Route path="guides" element={<Guides />} />
            <Route path="guides/restaurant-qr-code-google-reviews" element={<RestaurantGuide />} />
            <Route path="guides/how-hotels-can-win-google-reviews" element={<HotelGuide />} />
            <Route path="guides/turn-members-into-5-star-google-review" element={<GymGuide />} />
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
            <Route path="guides/spa-wellness-google-reviews" element={<SpaWellnessGuide />} />
            <Route path="guides/real-estate-5-star-google-reviews" element={<RealEstateGuide />} />
            <Route path="guides/photography-google-reviews" element={<PhotographyGuide />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
