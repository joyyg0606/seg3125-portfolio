const root = ReactDOM.createRoot(document.getElementById("root"));

const services = [
  ["Wash and Style", "$38", "45 minutes", "Wash, blow dry, and light styling for a clean finished look."],
  ["Short Haircut", "$45", "50 minutes", "Short haircut with a quick consultation before the cut starts."],
  ["Long Haircut", "$58", "60 minutes", "Trim or new shape for longer hair, including wash and blow dry."],
  ["Colour Consultation", "$25", "30 minutes", "A short appointment to discuss colour ideas, hair condition, and price range."]
];

function BloomBrushApp() {
  const [service, setService] = React.useState("Short Haircut");
  const [stylist, setStylist] = React.useState("Jessica");
  const [day, setDay] = React.useState("Wednesday");
  const [time, setTime] = React.useState("2:30 PM");
  const [name, setName] = React.useState("");
  const [note, setNote] = React.useState("");
  const [message, setMessage] = React.useState("");

  const selected = services.find(item => item[0] === service) || services[1];

  function sendBooking(event) {
    event.preventDefault();

    if (name.trim().length < 2) {
      setMessage("Please enter your name before confirming the appointment.");
      return;
    }

    setMessage(`Appointment request received for ${name}: ${service} with ${stylist} on ${day} at ${time}.`);
  }

  return React.createElement(
    "div",
    null,

    React.createElement(
      "nav",
      { className: "navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement("a", { className: "navbar-brand fw-bold", href: "#home" }, "Bloom & Brush"),
        React.createElement(
          "div",
          { className: "ms-auto" },
          React.createElement("a", { className: "nav-link d-inline mx-2", href: "#services" }, "Services"),
          React.createElement("a", { className: "nav-link d-inline mx-2", href: "#booking" }, "Book"),
          React.createElement("a", { className: "nav-link d-inline mx-2", href: "#contact" }, "Contact")
        )
      )
    ),

    React.createElement(
      "header",
      { id: "home", className: "hero-section" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row align-items-center" },
          React.createElement(
            "div",
            { className: "col-lg-7" },
            React.createElement("p", { className: "hero-tag" }, "Hair studio and appointment booking"),
            React.createElement("h1", { className: "display-4 fw-bold" }, "Simple hair appointments without the extra stress."),
            React.createElement("p", { className: "lead mt-3" }, "Bloom & Brush is a small hair studio for cuts, styling, and colour consultations."),
            React.createElement("a", { href: "#booking", className: "btn main-button mt-3" }, "Book an Appointment")
          ),
          React.createElement(
            "div",
            { className: "col-lg-5 mt-5 mt-lg-0" },
            React.createElement(
              "div",
              { className: "info-box" },
              React.createElement("div", { className: "icon-circle" }, "✂"),
              React.createElement("h3", { className: "fw-bold" }, "Open this week"),
              React.createElement("p", null, "Tuesday to Friday: 10:00 AM to 6:00 PM"),
              React.createElement("p", null, "Saturday: 10:00 AM to 4:00 PM")
            )
          )
        )
      )
    ),

    React.createElement(
      "section",
      { id: "services", className: "section-padding" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement("h2", { className: "section-title text-center" }, "Services"),
        React.createElement(
          "div",
          { className: "row g-4 mt-3" },
          services.map(item =>
            React.createElement(
              "div",
              { className: "col-md-6 col-lg-3", key: item[0] },
              React.createElement(
                "div",
                { className: "service-card" },
                React.createElement("h4", null, item[0]),
                React.createElement("p", null, item[3]),
                React.createElement("p", { className: "price-text mb-1" }, item[1]),
                React.createElement("p", { className: "small-muted" }, item[2]),
                React.createElement(
                  "button",
                  {
                    className: service === item[0] ? "btn outline-button active w-100" : "btn outline-button w-100",
                    onClick: () => setService(item[0])
                  },
                  service === item[0] ? "Selected" : "Select Service"
                )
              )
            )
          )
        )
      )
    ),

    React.createElement(
      "section",
      { id: "booking", className: "section-padding bg-light" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row g-4" },
          React.createElement(
            "div",
            { className: "col-lg-7" },
            React.createElement(
              "div",
              { className: "booking-card" },
              React.createElement("h2", { className: "section-title" }, "Book an Appointment"),
              React.createElement(
                "form",
                { onSubmit: sendBooking },
                React.createElement("label", { className: "form-label" }, "Your name"),
                React.createElement("input", {
                  className: "form-control mb-3",
                  value: name,
                  onChange: e => setName(e.target.value),
                  placeholder: "Enter your name"
                }),

                React.createElement("label", { className: "form-label" }, "Service"),
                React.createElement(
                  "select",
                  { className: "form-select mb-3", value: service, onChange: e => setService(e.target.value) },
                  services.map(item => React.createElement("option", { key: item[0] }, item[0]))
                ),

                React.createElement("label", { className: "form-label" }, "Stylist"),
                React.createElement(
                  "select",
                  { className: "form-select mb-3", value: stylist, onChange: e => setStylist(e.target.value) },
                  ["Jessica", "Mina", "Sofia"].map(item => React.createElement("option", { key: item }, item))
                ),

                React.createElement("label", { className: "form-label" }, "Day"),
                React.createElement(
                  "select",
                  { className: "form-select mb-3", value: day, onChange: e => setDay(e.target.value) },
                  ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(item => React.createElement("option", { key: item }, item))
                ),

                React.createElement("label", { className: "form-label" }, "Time"),
                React.createElement(
                  "select",
                  { className: "form-select mb-3", value: time, onChange: e => setTime(e.target.value) },
                  ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"].map(item => React.createElement("option", { key: item }, item))
                ),

                React.createElement("label", { className: "form-label" }, "Extra note"),
                React.createElement("textarea", {
                  className: "form-control mb-3",
                  rows: "3",
                  value: note,
                  onChange: e => setNote(e.target.value),
                  placeholder: "Example: I want a small trim, not a big change."
                }),

                React.createElement("button", { className: "btn main-button", type: "submit" }, "Confirm Appointment")
              )
            )
          ),

          React.createElement(
            "div",
            { className: "col-lg-5" },
            React.createElement(
              "div",
              { className: "booking-card" },
              React.createElement("h3", { className: "fw-bold" }, "Booking Summary"),
              React.createElement(
                "div",
                { className: "booking-summary mt-3" },
                React.createElement("p", null, React.createElement("strong", null, "Service: "), service),
                React.createElement("p", null, React.createElement("strong", null, "Stylist: "), stylist),
                React.createElement("p", null, React.createElement("strong", null, "Day: "), day),
                React.createElement("p", null, React.createElement("strong", null, "Time: "), time),
                React.createElement("p", null, React.createElement("strong", null, "Price: "), selected[1]),
                React.createElement("p", null, React.createElement("strong", null, "Length: "), selected[2])
              ),
              note.trim() !== "" && React.createElement("p", { className: "small-muted mt-3" }, React.createElement("strong", null, "Client note: "), note),
              message !== "" && React.createElement("div", { className: "alert alert-success mt-4" }, message)
            )
          )
        )
      )
    ),

    React.createElement(
      "section",
      { id: "contact", className: "section-padding" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "contact-card" },
          React.createElement("h2", { className: "section-title" }, "Contact Information"),
          React.createElement("p", null, React.createElement("strong", null, "Business: "), "Bloom & Brush Hair Studio"),
          React.createElement("p", null, React.createElement("strong", null, "Type: "), "Hair salon and styling service"),
          React.createElement("p", null, React.createElement("strong", null, "Address: "), "120 Laurier Avenue, Ottawa, ON"),
          React.createElement("p", null, React.createElement("strong", null, "Phone: "), "613-555-0188"),
          React.createElement("p", null, React.createElement("strong", null, "Email: "), "hello@bloombrush.ca"),
          React.createElement("p", null, React.createElement("strong", null, "Designed by: "), "Joy Yeung")
        )
      )
    ),

    React.createElement(
      "footer",
      { className: "footer text-center" },
      React.createElement("div", { className: "container" }, "Bloom & Brush Hair Studio | Designed by Joy Yeung")
    )
  );
}

root.render(React.createElement(BloomBrushApp));