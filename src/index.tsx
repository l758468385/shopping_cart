import { StrictMode } from 'react';
// @ts-ignore
import  ReactDOMClient from 'react-dom/client';

/* Theme */
import { ThemeProvider } from 'commons/style/styled-components';
import { theme } from 'commons/style/theme';
import GlobalStyle from 'commons/style/global-style';
import { Provider } from 'react-redux';
import store from './store';


import App from 'components/App';

const root = document.getElementById('root')!;
const container = ReactDOMClient.createRoot(root);

container.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>,
    </ThemeProvider>
  </StrictMode>
);
