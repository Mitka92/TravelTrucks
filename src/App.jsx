import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import { Toaster } from 'react-hot-toast'; // Імпортуємо Toaster
import Loader from './components/Loader/Loader.jsx';

// Ліниве завантаження компонентів
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));
const CamperDetailsPage = lazy(() =>
  import('./pages/CamperDetailsPage/CamperDetailsPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx')
);
const CamperFeatures = lazy(() =>
  import('./components/CamperFeatures/CamperFeatures.jsx')
);
const CamperReviews = lazy(() =>
  import('./components/CamperReviews/CamperReviews.jsx')
);

function App() {
  return (
    <>
      <Toaster />
      <Suspense fallback={<Loader type="page loader" />}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CamperDetailsPage />}>
              <Route path="features" element={<CamperFeatures />} />
              <Route path="reviews" element={<CamperReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
