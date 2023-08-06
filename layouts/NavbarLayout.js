const NavbarLayout = ({ setRoutes, routes, children }) => {
  return (
    <div>
      <div className="uk-container">
        {children}
      </div>
      <nav className="navbar">
        <button onClick={() => { setRoutes(routes.TOP) }}>TOP</button>
        <button onClick={() => { setRoutes(routes.RECORDING) }}>記録</button>
        <button onClick={() => { setRoutes(routes.HELP_MARK) }}>ヘルプマーク</button>
        <button onClick={() => { setRoutes(routes.HELP_MARK) }}>プロフィール</button>
      </nav>
    </div>
  );
};
