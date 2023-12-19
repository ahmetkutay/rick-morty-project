import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './state/store';
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}