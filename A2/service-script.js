const bloomMenu = [
  {
    title: "Wash and Style",
    price: "$38",
    length: "45 minutes",
    details: "Wash, blow dry, and light styling for a clean finished look.",
    bestMatch: "quick refresh",
    colourOnly: false
  },
  {
    title: "Short Haircut",
    price: "$45",
    length: "50 minutes",
    details: "Short haircut with a quick consultation before the cut starts.",
    bestMatch: "Lucy's storyboard",
    colourOnly: false
  },
  {
    title: "Long Haircut",
    price: "$58",
    length: "60 minutes",
    details: "Trim or new shape for longer hair, including wash and blow dry.",
    bestMatch: "long hair appointment",
    colourOnly: false
  },
  {
    title: "Colour Consultation",
    price: "$25",
    length: "30 minutes",
    details: "A short appointment to discuss colour ideas, hair condition, and price range.",
    bestMatch: "Maya checking prices",
    colourOnly: true
  }
];

const bloomStaff = {
  Jessica: "short cuts and simple trims",
  Mina: "wash, style, and longer hair",
  Sofia: "colour consultation appointments"
};

const studioDays = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdayTimes = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];
const saturdayTimes = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM"];

const bookedSalonSpots = [
  "Jessica-Wednesday-2:30 PM",
  "Mina-Friday-11:30 AM",
  "Sofia-Saturday-1:00 PM"
];

function BloomBrushAppointmentSite() {
  const [booking, setBooking] = React.useState({
    service: "Short Haircut",
    stylist: "Jessica",
    day: "Wednesday",
    time: "2:30 PM",
    name: "",
    phone: "",
    note: ""
  });

  const [studioReply, setStudioReply] = React.useState({
    kind: "",
    text: ""
  });

  const selectedService =
    bloomMenu.find(item => item.title === booking.service) || bloomMenu[1];

  const timeChoices = booking.day === "Saturday" ? saturdayTimes : weekdayTimes;
  const spotKey = `${booking.stylist}-${booking.day}-${booking.time}`;
  const isAlreadyBooked = bookedSalonSpots.includes(spotKey);

  function updateBooking(field, value) {
    const nextBooking = { ...booking, [field]: value };

    if (field === "day" && value === "Saturday" && booking.time === "4:00 PM") {
      nextBooking.time = "2:30 PM";
    }

    setBooking(nextBooking);
    setStudioReply({ kind: "", text: "" });
  }

  function pickServiceFromCard(serviceTitle) {
    const picked = bloomMenu.find(item => item.title === serviceTitle);

    setBooking({
      ...booking,
      service: serviceTitle,
      stylist: picked && picked.colourOnly ? "Sofia" : booking.stylist
    });

    setStudioReply({ kind: "", text: "" });
  }

  function sendSalonRequest(event) {
    event.preventDefault();

    const cleanName = booking.name.trim();
    const cleanPhone = booking.phone.trim();
    const cleanNote = booking.note.trim();

    if (cleanName.length < 2) {
      setStudioReply({
        kind: "error",
        text: "Please enter your name so the salon knows who the request is for."
      });
      return;
    }

    if (cleanPhone.length > 0 && cleanPhone.length < 7) {
      setStudioReply({
        kind: "error",
        text: "The phone number looks too short. Please check it or leave it blank."
      });
      return;
    }

    if (isAlreadyBooked) {
      setStudioReply({
        kind: "error",
        text: `${booking.stylist} is already booked on ${booking.day} at ${booking.time}. Please choose a different time.`
      });
      return;
    }

    if (selectedService.colourOnly && booking.stylist !== "Sofia") {
      setStudioReply({
        kind: "error",
        text: "Colour consultations are handled by Sofia in this prototype."
      });
      return;
    }

    if (cleanNote.length > 150) {
      setStudioReply({
        kind: "error",
        text: "Please shorten the note a little so it fits in the appointment request."
      });
      return;
    }

    setStudioReply({
      kind: "success",
      text: `Request received for ${cleanName}: ${booking.service} with ${booking.stylist} on ${booking.day} at ${booking.time}.`
    });
  }

  return (
    <>
      <BloomHeaderNav />
      <BloomOpeningSection />
      <BloomServiceCards
        pickedService={booking.service}
        pickServiceFromCard={pickServiceFromCard}
      />
      <BloomBookingSection
        booking={booking}
        selectedService={selectedService}
        timeChoices={timeChoices}
        isAlreadyBooked={isAlreadyBooked}
        studioReply={studioReply}
        updateBooking={updateBooking}
        sendSalonRequest={sendSalonRequest}
      />
      <BloomDesignReasoning />
      <BloomContactInfo />
      <BloomFooter />
    </>
  );
}

function BloomHeaderNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home">Bloom & Brush</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainMenu"
          aria-controls="mainMenu"
          aria-expanded="false"
          aria-label="Toggle salon menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="#booking">Book</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function BloomOpeningSection() {
  return (
    <header id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <p className="hero-tag">Hair studio and appointment booking</p>
            <h1 className="display-4 fw-bold">Simple hair appointments without the extra stress.</h1>
            <p className="lead mt-3">
              Bloom & Brush is a small hair studio for cuts, styling, and colour consultations.
              The site helps clients compare services and request a time that works for them.
            </p>
            <a href="#booking" className="btn main-button mt-3">Book an Appointment</a>
          </div>

          <div className="col-lg-5 mt-5 mt-lg-0">
            <div className="info-box">
              <div className="icon-circle">✂</div>
              <h3 className="fw-bold">Open this week</h3>
              <p className="mb-1">Tuesday to Friday: 10:00 AM to 6:00 PM</p>
              <p className="mb-1">Saturday: 10:00 AM to 4:00 PM</p>
              <p className="mb-0 small-muted">
                Walk-ins are not guaranteed because the stylists may already be booked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function BloomServiceCards({ pickedService, pickServiceFromCard }) {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Services</h2>
          <p className="text-muted">
            The cards let users compare services before moving to the booking form.
          </p>
        </div>

        <div className="row g-4">
          {bloomMenu.map(item => {
            const isPicked = pickedService === item.title;

            return (
              <div className="col-md-6 col-lg-3" key={item.title}>
                <div className="service-card">
                  <h4>{item.title}</h4>
                  <p>{item.details}</p>
                  <p className="price-text mb-1">{item.price}</p>
                  <p className="small-muted">{item.length}</p>
                  <p className="small-muted">Used for: {item.bestMatch}</p>

                  <button
                    className={isPicked ? "btn outline-button active w-100" : "btn outline-button w-100"}
                    onClick={() => pickServiceFromCard(item.title)}
                  >
                    {isPicked ? "Selected" : "Select Service"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BloomBookingSection(props) {
  return (
    <section id="booking" className="section-padding bg-light">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-7">
            <div className="booking-card">
              <h2 className="section-title">Book an Appointment</h2>
              <p className="text-muted">
                This prototype does not send a real appointment, but it checks the request before showing confirmation.
              </p>

              <form onSubmit={props.sendSalonRequest}>
                <div className="mb-3">
                  <label className="form-label">Your name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.booking.name}
                    onChange={event => props.updateBooking("name", event.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone number optional</label>
                  <input
                    type="text"
                    className="form-control"
                    value={props.booking.phone}
                    onChange={event => props.updateBooking("phone", event.target.value)}
                    placeholder="Example: 6135550188"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Service</label>
                    <select
                      className="form-select"
                      value={props.booking.service}
                      onChange={event => props.updateBooking("service", event.target.value)}
                    >
                      {bloomMenu.map(item => (
                        <option key={item.title}>{item.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stylist</label>
                    <select
                      className="form-select"
                      value={props.booking.stylist}
                      onChange={event => props.updateBooking("stylist", event.target.value)}
                    >
                      {Object.keys(bloomStaff).map(name => (
                        <option key={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Day</label>
                    <select
                      className="form-select"
                      value={props.booking.day}
                      onChange={event => props.updateBooking("day", event.target.value)}
                    >
                      {studioDays.map(day => (
                        <option key={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Time</label>
                    <select
                      className="form-select"
                      value={props.booking.time}
                      onChange={event => props.updateBooking("time", event.target.value)}
                    >
                      {props.timeChoices.map(time => (
                        <option key={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {props.isAlreadyBooked && (
                  <div className="alert alert-warning">
                    This sample slot is already taken. Please try another time.
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Extra note</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={props.booking.note}
                    onChange={event => props.updateBooking("note", event.target.value)}
                    placeholder="Example: I want a small trim, not a big change."
                  ></textarea>
                </div>

                <button className="btn main-button" type="submit">
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="booking-card">
              <h3 className="fw-bold">Booking Summary</h3>

              <div className="booking-summary mt-3">
                <p className="mb-1"><strong>Service:</strong> {props.booking.service}</p>
                <p className="mb-1"><strong>Stylist:</strong> {props.booking.stylist}</p>
                <p className="mb-1"><strong>Day:</strong> {props.booking.day}</p>
                <p className="mb-1"><strong>Time:</strong> {props.booking.time}</p>
                <p className="mb-1"><strong>Price:</strong> {props.selectedService.price}</p>
                <p className="mb-1"><strong>Length:</strong> {props.selectedService.length}</p>
                <p className="mb-0"><strong>Stylist focus:</strong> {bloomStaff[props.booking.stylist]}</p>
              </div>

              {props.booking.note.trim() !== "" && (
                <p className="small-muted mt-3 mb-0">
                  <strong>Client note:</strong> {props.booking.note}
                </p>
              )}

              {props.studioReply.text !== "" && (
                <div className={props.studioReply.kind === "success" ? "alert alert-success mt-4 mb-0" : "alert alert-danger mt-4 mb-0"}>
                  {props.studioReply.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BloomDesignReasoning() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="info-box">
              <div className="icon-circle">♡</div>
              <h4 className="fw-bold">Calm Experience</h4>
              <p>
                The softer style supports users who want booking to feel quick and low pressure.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-box">
              <div className="icon-circle">$</div>
              <h4 className="fw-bold">Clear Prices</h4>
              <p>
                Prices stay visible because one persona checks cost before making an appointment.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-box">
              <div className="icon-circle">✓</div>
              <h4 className="fw-bold">Easy Booking</h4>
              <p>
                The form keeps the booking steps together instead of splitting them across pages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BloomContactInfo() {
  return (
    <section id="contact" className="section-padding bg-light">
      <div className="container">
        <div className="contact-card">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2 className="section-title">Contact Information</h2>
              <p className="mb-1"><strong>Business:</strong> Bloom & Brush Hair Studio</p>
              <p className="mb-1"><strong>Type:</strong> Hair salon and styling service</p>
              <p className="mb-1"><strong>Address:</strong> 120 Laurier Avenue, Ottawa, ON</p>
              <p className="mb-1"><strong>Phone:</strong> 613-555-0188</p>
              <p className="mb-0"><strong>Email:</strong> hello@bloombrush.ca</p>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0">
              <p className="mb-1"><strong>Designed by:</strong> Joy Yeung</p>
              <p className="small-muted mb-0">SEG3125 Assignment 2 high-fidelity prototype.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BloomFooter() {
  return (
    <footer className="footer text-center">
      <div className="container">
        <p className="mb-0">Bloom & Brush Hair Studio | Designed by Joy Yeung</p>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<BloomBrushAppointmentSite />);