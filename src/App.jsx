import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import NotFound from './pages/NotFound';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/*" element={<AppRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
