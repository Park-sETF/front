// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // 서비스 워커 등록 파일

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
);

serviceWorkerRegistration.register();
