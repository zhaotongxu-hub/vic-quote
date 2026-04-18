export default function App() {
  return React.createElement(
    "div",
    { style: { padding: "40px", fontFamily: "Arial" } },
    [
      React.createElement("h1", {}, "VIC Quote System"),
      React.createElement("p", {}, "System is working ✅"),
      React.createElement("button", {
        onClick: () => alert("Next step: build full quote system")
      }, "Test Button")
    ]
  );
}
