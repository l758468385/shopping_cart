import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // 导入你的 Redux store
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'commons/style/styled-components';
import { theme } from 'commons/style/theme';
import GlobalStyle from 'commons/style/global-style';
import App from 'components/App';

const root = document.getElementById('root')!;

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      {/* 使用 PersistGate 包裹整个应用 */}
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
  root
);
