import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PostHogProvider } from 'posthog-js/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const posthogKey = process.env.REACT_APP_POSTHOG_KEY || '';
const posthogHost = process.env.REACT_APP_POSTHOG_HOST || '';

root.render(
  <BrowserRouter>
    <PostHogProvider
      apiKey={posthogKey}
      options={{
        api_host: posthogHost,
        defaults: '2025-05-24',
        capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
        debug: process.env.NODE_ENV === 'development',
      }}
    >
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </PostHogProvider>
  </BrowserRouter>
);

reportWebVitals();