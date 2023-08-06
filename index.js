'use strict';

const { createElement, useState } = React;

const ROUTES = {
  MENU: 'menu',
  HELP_MARK: 'help-mark',
  PROFILE: 'profile',
  RECORDING: 'recording',
};

const routing = (route) => {
  switch (route) {
    case ROUTES.HELP_MARK:
      return <HelpMarkPage />;
    case ROUTES.PROFILE:
      return <ProfilePage />;
    case ROUTES.TIMELINE:
      return <TimelinePage />;
    default:
      return <HelpMarkPage />;
  };
}

const Page = () => {
  const [route, setRoute] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <div className="main">
      <MainLayout setRoute={setRoute} routes={ROUTES}>
        {
          routing(route)
        }
      </MainLayout>
    </div>
  );
};


console.log(document.domain);
const isDev = document.domain === '127.0.0.1' || document.domain === 'localhost';

if (isDev) {
  const domContainer = document.querySelector('#root-render');
  const root = ReactDOM.createRoot(domContainer);
  root.render(createElement(Page));
} else {
  console.log('[START]liff.init');
  liff
    .init({ liffId: '2000323157-gP2ZWyMN' })
    .then(() => {
      console.log(`[START]liff.isLoggedIn: ${liff.isLoggedIn()}`);
      if (!liff.isLoggedIn()) {
        console.log('[START]liff.login');
        liff.login();
        return;
      }

      console.log('[START]ReactDOM.createRoot');
      const domContainer = document.querySelector('#root-render');
      const root = ReactDOM.createRoot(domContainer);
      root.render(createElement(Page));
      console.log('[END]ReactDOM.createRoot');
    })
    .catch((e) => {
      alert(`LIFF error: ${e.message}`);
    })
    .finally(() => {
      console.log('[END]liff.init');
    });
}
