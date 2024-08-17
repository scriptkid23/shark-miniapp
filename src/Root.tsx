
import {
  SDKProvider,
  useLaunchParams
} from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from 'App';
import { ErrorBoundary } from 'components/Layout/ErrorBoundary';
import { FC, useEffect, useMemo } from 'react';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>{error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error)}</code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <App />
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <Inner />
    </ErrorBoundary>
  );
}

export default Root;
