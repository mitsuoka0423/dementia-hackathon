const MainLayout = ({ children, setRoute, routes }) => {
  return (
    <div>
      <div className="uk-container">
        {children}
      </div>
      <nav className="navbar">
        <button onClick={() => { setRoute(routes.MENU) }}>MENU</button>
        <button onClick={() => { setRoute(routes.RECORDING) }}>記録</button>
        <button onClick={() => { setRoute(routes.HELP_MARK) }}>ヘルプマーク</button>
        <button onClick={() => { setRoute(routes.PROFILE) }}>プロフィール</button>
      </nav>
    </div>
  );
};
