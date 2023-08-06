'use strict';

const { createElement, useState } = React;

const ROUTES = {
  TOP: 'top',
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
    case ROUTES.RECORDING:
      return <RecordingPage />;
    case ROUTES.TOP:
    default:
      return <TopPage />;
  };
}

const Page = () => {
  const [route, setRoute] = useState(ROUTES.HELP_MARK);

  return (
    <div className="main">
      <NavbarLayout setRoute={setRoute} routes={ROUTES}>
        {
          routing(route)
        }
      </NavbarLayout>
    </div>
  );
};

const domContainer = document.querySelector('#root-render');
const root = ReactDOM.createRoot(domContainer);
root.render(createElement(Page));
