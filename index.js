'use strict';

const { createElement, useState } = React;

const Page = () => {
  return <RecordingPage />;
};

const domContainer = document.querySelector('#root-render');
const root = ReactDOM.createRoot(domContainer);
root.render(createElement(Page));
