const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Hello World")
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(App));
