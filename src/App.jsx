import mainRouter from '~/routers/main-router';
import { RouterProvider } from 'react-router-dom';
import {StockProvider} from './components/context/StockProvider'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '~/stores/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <StockProvider>
        <RouterProvider router={mainRouter} />
      </StockProvider>
      </PersistGate>
    </Provider>
  );
}
export default App;
