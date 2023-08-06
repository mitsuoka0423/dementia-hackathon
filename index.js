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

screen.orientation.lock();

console.log(document.domain);
if (document.domain === '127.0.0.1' || document.domain === 'localhost') {
  const domContainer = document.querySelector('#root-render');
  const root = ReactDOM.createRoot(domContainer);
  root.render(createElement(Page));
} else {
  liff
  .init({ liffId: '2000323157-gP2ZWyMN' })
  .then(() => {
    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }

    setUserId(liff.getProfile().userId);
    const domContainer = document.querySelector('#root-render');
    const root = ReactDOM.createRoot(domContainer);
    root.render(createElement(Page));
  })
  .catch((e) => {
    alert(`LIFF error: ${e.message}`)
  });
}
