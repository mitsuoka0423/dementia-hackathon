const MainLayout = ({ children, setRoute, routes }) => {
  return (
    <div>
      <div className="uk-container">
        {children}
      </div>
      <nav className="navbar">
        <button onClick={() => { setRoute(routes.HELP_MARK) }} className="navbar-item navbar-button">
          <img src="./img/help.png" className="navbar-button-img"></img>
          <div className="navbar-button-text">ヘルプマーク</div>
        </button>
        <button onClick={() => { setRoute(routes.PROFILE) }} className="navbar-item navbar-button">
          <img src="./img/profile.png" className="navbar-button-img"></img>
          <div className="navbar-button-text">プロフィール</div>
        </button>
        <button onClick={() => { setRoute(routes.TIMELINE) }} className="navbar-item navbar-button">
          <img src="./img/clock.png" className="navbar-button-img"></img>
          <div className="navbar-button-text">タイムライン</div>
        </button>
      </nav>
    </div>
  );
};
