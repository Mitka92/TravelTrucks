import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx';
import CamperDetailsPage from './pages/CamperDetailsPage/CamperDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import Header from './components/header/Header.jsx';
import CamperFeatures from './components/CamperFeatures/CamperFeatures.jsx';
import CamperReviews from './components/CamperReviews/CamperReviews.jsx';
import { Toaster } from 'react-hot-toast'; // Імпортуємо Toaster
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />}>
            <Route path="/catalog/:id/features" element={<CamperFeatures />} />
            <Route path="/catalog/:id/reviews" element={<CamperReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
