import mainRouter from '~/routers/main-router';
import { RouterProvider } from 'react-router-dom';
import {StockProvider} from './components/context/StockProvider'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <StockProvider>
      <RouterProvider router={mainRouter} />
    </StockProvider>
  )
}

export default App;
