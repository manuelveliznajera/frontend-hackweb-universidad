import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './App.jsx'
import TablaUsuarios from './component/getTable.jsx';
import GetById from './component/getById.jsx';

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/escritorio" element={<TablaUsuarios />} />
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path='/usuario/:id' element={<GetById  />} />'
    </Routes>
  </BrowserRouter>,
)
