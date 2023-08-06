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
  const [route, setRoute] = useState(ROUTES.TIMELINE);

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

const domContainer = document.querySelector('#root-render');
const root = ReactDOM.createRoot(domContainer);
root.render(createElement(Page));
