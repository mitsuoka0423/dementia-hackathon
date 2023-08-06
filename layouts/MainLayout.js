const MainLayout = ({ children, setRoute, routes }) => {
  return (
    <div>
      <div className="uk-container">
        {children}
      </div>
      <nav className="navbar">
        <button onClick={() => { setRoute(routes.MENU) }} className="navbar-item navbar-button">
          <img src="./img/home.png" className="navbar-button-img"></img>
        </button>
        <button onClick={() => { setRoute(routes.RECORDING) }} className="navbar-item navbar-button">
          <img src="./img/pencil.png" className="navbar-button-img"></img>
        </button>
        <button onClick={() => { setRoute(routes.HELP_MARK) }} className="navbar-item navbar-button">
          <img src="./img/note.png" className="navbar-button-img"></img>
        </button>
        <button onClick={() => { setRoute(routes.PROFILE) }} className="navbar-item navbar-button">
          <img src="./img/profile.png" className="navbar-button-img"></img>
        </button>
      </nav>
    </div>
  );
};
