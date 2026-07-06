const root = ReactDOM.createRoot(document.getElementById("root"));

const products = [
  { id: 1, name: "Soft Grid Notebook", price: 14, category: "Notebook", color: "Cream", use: "School", icon: "📓", detail: "A grid notebook for class notes, plans, and small sketches." },
  { id: 2, name: "Daily Planner Pad", price: 18, category: "Planner", color: "Pink", use: "Planning", icon: "🗓️", detail: "A simple tear-off planner for daily tasks and reminders." },
  { id: 3, name: "Smooth Black Pen Set", price: 9, category: "Pen", color: "Black", use: "School", icon: "🖊️", detail: "Three black gel pens for clean writing and studying." },
  { id: 4, name: "Pastel Highlighters", price: 12, category: "Marker", color: "Pastel", use: "Studying", icon: "🖍️", detail: "Soft coloured highlighters that are easy to read over." },
  { id: 5, name: "Mini Sticky Notes", price: 6, category: "Sticky Notes", color: "Yellow", use: "Planning", icon: "📝", detail: "Small sticky notes for reminders, page markers, and quick ideas." },
  { id: 6, name: "Desk Sticker Pack", price: 7, category: "Sticker", color: "Pastel", use: "Decor", icon: "🌷", detail: "Cute stickers for planners, laptops, and notebooks." },
  { id: 7, name: "Linen Pencil Case", price: 16, category: "Pouch", color: "Cream", use: "School", icon: "👝", detail: "A soft pencil case for pens, highlighters, and small supplies." },
  { id: 8, name: "Weekly Desk Planner", price: 22, category: "Planner", color: "Brown", use: "Planning", icon: "📅", detail: "A weekly planner to organize school, work, and personal tasks." }
];

function CozyDeskApp() {
  const [category, setCategory] = React.useState("All");
  const [color, setColor] = React.useState("All");
  const [use, setUse] = React.useState("All");
  const [price, setPrice] = React.useState("All");
  const [cart, setCart] = React.useState([]);
  const [checkoutStep, setCheckoutStep] = React.useState(1);
  const [customerName, setCustomerName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [orderMessage, setOrderMessage] = React.useState("");
  const [surveyRating, setSurveyRating] = React.useState("5");
  const [surveyComment, setSurveyComment] = React.useState("");
  const [surveyMessage, setSurveyMessage] = React.useState("");

  const filteredProducts = products.filter(item => {
    const matchCategory = category === "All" || item.category === category;
    const matchColor = color === "All" || item.color === color;
    const matchUse = use === "All" || item.use === use;
    let matchPrice = true;

    if (price === "Under $10") {
      matchPrice = item.price < 10;
    } else if (price === "$10 to $17") {
      matchPrice = item.price >= 10 && item.price <= 17;
    } else if (price === "$18 and up") {
      matchPrice = item.price >= 18;
    }

    return matchCategory && matchColor && matchUse && matchPrice;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function addToCart(item) {
    setCart(cart.concat(item));
    setOrderMessage(`${item.name} was added to your cart.`);
  }

  function removeFromCart(index) {
    const newCart = cart.filter((item, itemIndex) => itemIndex !== index);
    setCart(newCart);
  }

  function resetFilters() {
    setCategory("All");
    setColor("All");
    setUse("All");
    setPrice("All");
  }

  function goToCustomerStep() {
    if (cart.length === 0) {
      setOrderMessage("Please add at least one item to the cart before checkout.");
      return;
    }
    setCheckoutStep(2);
    setOrderMessage("");
  }

  function goToPaymentStep(event) {
    event.preventDefault();
    if (customerName.trim() === "" || email.trim() === "" || address.trim() === "") {
      setOrderMessage("Please fill in your name, email, and address before continuing.");
      return;
    }
    setCheckoutStep(3);
    setOrderMessage("");
  }

  function finishOrder(event) {
    event.preventDefault();
    if (cardName.trim() === "" || cardNumber.trim().length < 4) {
      setOrderMessage("Please enter the payment information before placing the order.");
      return;
    }
    setCheckoutStep(4);
    setOrderMessage(`Thank you ${customerName}. Your Cozy Desk order has been confirmed.`);
  }

  function sendSurvey(event) {
    event.preventDefault();
    if (surveyComment.trim().length < 3) {
      setSurveyMessage("Please write a short comment before sending the survey.");
      return;
    }
    setSurveyMessage(`Thank you for the ${surveyRating}/5 rating. Your feedback helps Cozy Desk improve.`);
    setSurveyComment("");
  }

  return React.createElement(
    "div",
    null,
    React.createElement(ShopNav),
    React.createElement(ShopHero),
    React.createElement(DealBanner),
    React.createElement(
      "section",
      { id: "shop", className: "section-padding" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement("h2", { className: "fw-bold text-center" }, "Shop Stationery"),
        React.createElement("p", { className: "text-center small-muted mb-5" }, "Use the filters to narrow the products, then add your favourite item to the cart."),
        React.createElement(
          "div",
          { className: "row g-4" },
          React.createElement(
            "div",
            { className: "col-lg-3" },
            React.createElement(FilterPanel, { category, color, use, price, setCategory, setColor, setUse, setPrice, resetFilters })
          ),
          React.createElement(
            "div",
            { className: "col-lg-9" },
            React.createElement("p", { className: "small-muted" }, filteredProducts.length, " item(s) match your choices."),
            React.createElement(ProductGrid, { filteredProducts, addToCart })
          )
        )
      )
    ),
    React.createElement(
      "section",
      { id: "checkout", className: "section-padding bg-light" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement("h2", { className: "fw-bold text-center mb-4" }, "Cart and Checkout"),
        React.createElement(
          "div",
          { className: "row g-4" },
          React.createElement(
            "div",
            { className: "col-lg-4" },
            React.createElement(CartBox, { cart, total, removeFromCart, goToCustomerStep })
          ),
          React.createElement(
            "div",
            { className: "col-lg-8" },
            React.createElement(CheckoutBox, {
              checkoutStep, customerName, email, address, cardName, cardNumber,
              setCustomerName, setEmail, setAddress, setCardName, setCardNumber,
              goToPaymentStep, finishOrder, orderMessage, total
            })
          )
        )
      )
    ),
    React.createElement(SurveyBox, { surveyRating, setSurveyRating, surveyComment, setSurveyComment, surveyMessage, sendSurvey }),
    React.createElement(HeuristicNotes),
    React.createElement(ShopFooter)
  );
}

function ShopNav() {
  return React.createElement(
    "nav",
    { className: "navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement("a", { className: "navbar-brand fw-bold", href: "#home" }, "Cozy Desk"),
      React.createElement(
        "div",
        { className: "ms-auto" },
        React.createElement("a", { className: "nav-link d-inline mx-2", href: "#shop" }, "Shop"),
        React.createElement("a", { className: "nav-link d-inline mx-2", href: "#checkout" }, "Checkout"),
        React.createElement("a", { className: "nav-link d-inline mx-2", href: "#survey" }, "Survey"),
        React.createElement("a", { className: "nav-link d-inline mx-2", href: "index.html" }, "Portfolio")
      )
    )
  );
}

function ShopHero() {
  return React.createElement(
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
          React.createElement("p", { className: "hero-tag" }, "Stationery for school and planning"),
          React.createElement("h1", { className: "display-4 fw-bold" }, "Make your desk feel calm and organized."),
          React.createElement("p", { className: "lead mt-3" }, "Cozy Desk sells simple notebooks, planners, pens, and small desk items for students and people who like organized spaces."),
          React.createElement("a", { href: "#shop", className: "btn main-button mt-3" }, "Browse Products")
        ),
        React.createElement(
          "div",
          { className: "col-lg-5 mt-4 mt-lg-0" },
          React.createElement(
            "div",
            { className: "filter-box" },
            React.createElement("h3", { className: "fw-bold" }, "New study bundle"),
            React.createElement("p", null, "Pick a notebook, highlighter set, and sticky notes for an easy class setup."),
            React.createElement("p", { className: "price-text mb-0" }, "Save 10% this week")
          )
        )
      )
    )
  );
}

function DealBanner() {
  return React.createElement(
    "section",
    { className: "container mt-4" },
    React.createElement(
      "div",
      { className: "deal-banner" },
      React.createElement("h2", { className: "h4 fw-bold" }, "Small desk refresh? Start with one useful item today!"),
      React.createElement("p", { className: "mb-0" }, "This section uses promotional wording to encourage the user to explore deals without being too pushy.")
    )
  );
}

function FilterPanel(props) {
  return React.createElement(
    "div",
    { className: "filter-box" },
    React.createElement("h3", { className: "h5 fw-bold" }, "Filter Products"),
    React.createElement("p", { className: "small-muted" }, "Choose what matters to you."),
    React.createElement(FilterSelect, { label: "Category", value: props.category, change: props.setCategory, options: ["All", "Notebook", "Planner", "Pen", "Marker", "Sticky Notes", "Sticker", "Pouch"] }),
    React.createElement(FilterSelect, { label: "Colour", value: props.color, change: props.setColor, options: ["All", "Cream", "Pink", "Black", "Pastel", "Yellow", "Brown"] }),
    React.createElement(FilterSelect, { label: "Use", value: props.use, change: props.setUse, options: ["All", "School", "Planning", "Studying", "Decor"] }),
    React.createElement(FilterSelect, { label: "Price", value: props.price, change: props.setPrice, options: ["All", "Under $10", "$10 to $17", "$18 and up"] }),
    React.createElement("button", { className: "btn light-button w-100 mt-2", onClick: props.resetFilters }, "Clear Filters")
  );
}

function FilterSelect(props) {
  return React.createElement(
    "div",
    null,
    React.createElement("label", { className: "form-label mt-2" }, props.label),
    React.createElement(
      "select",
      { className: "form-select mb-2", value: props.value, onChange: event => props.change(event.target.value) },
      props.options.map(option => React.createElement("option", { key: option }, option))
    )
  );
}

function ProductGrid(props) {
  if (props.filteredProducts.length === 0) {
    return React.createElement("div", { className: "feedback-warn" }, "No products match these filters. Try changing one filter.");
  }

  return React.createElement(
    "div",
    { className: "row g-4" },
    props.filteredProducts.map(item => React.createElement(ProductCard, { key: item.id, item, addToCart: props.addToCart }))
  );
}

function ProductCard(props) {
  const item = props.item;
  return React.createElement(
    "div",
    { className: "col-md-6 col-xl-4" },
    React.createElement(
      "div",
      { className: "product-card" },
      React.createElement("div", { className: "product-icon" }, item.icon),
      React.createElement("h3", { className: "h5 product-title" }, item.name),
      React.createElement("p", null, item.detail),
      React.createElement("p", { className: "small-muted mb-1" }, item.category, " | ", item.color, " | ", item.use),
      React.createElement("p", { className: "price-text" }, "$", item.price),
      React.createElement("button", { className: "btn main-button w-100", onClick: () => props.addToCart(item) }, "Add to Cart")
    )
  );
}

function CartBox(props) {
  return React.createElement(
    "div",
    { className: "cart-box" },
    React.createElement("h3", { className: "h5 fw-bold" }, "Your Cart"),
    props.cart.length === 0 && React.createElement("p", { className: "small-muted" }, "Your cart is empty."),
    props.cart.map((item, index) =>
      React.createElement(
        "div",
        { className: "cart-item", key: index },
        React.createElement("p", { className: "mb-1" }, React.createElement("strong", null, item.name)),
        React.createElement("p", { className: "mb-2" }, "$", item.price),
        React.createElement("button", { className: "btn btn-sm light-button", onClick: () => props.removeFromCart(index) }, "Remove")
      )
    ),
    React.createElement("h4", { className: "h5 mt-3" }, "Total: $", props.total),
    React.createElement("button", { className: "btn main-button w-100 mt-2", onClick: props.goToCustomerStep }, "Start Checkout")
  );
}

function CheckoutBox(props) {
  return React.createElement(
    "div",
    { className: "checkout-box" },
    React.createElement("div", { className: "step-row" },
      React.createElement("span", { className: props.checkoutStep >= 1 ? "step-pill done" : "step-pill" }, "1 Cart"),
      React.createElement("span", { className: props.checkoutStep >= 2 ? "step-pill active" : "step-pill" }, "2 Information"),
      React.createElement("span", { className: props.checkoutStep >= 3 ? "step-pill active" : "step-pill" }, "3 Payment"),
      React.createElement("span", { className: props.checkoutStep === 4 ? "step-pill active" : "step-pill" }, "4 Confirmation")
    ),
    props.checkoutStep === 1 && React.createElement("p", null, "Review your cart, then start checkout when you are ready."),
    props.checkoutStep === 2 && React.createElement(CustomerForm, props),
    props.checkoutStep === 3 && React.createElement(PaymentForm, props),
    props.checkoutStep === 4 && React.createElement("div", { className: "feedback-good" }, props.orderMessage),
    props.orderMessage !== "" && props.checkoutStep !== 4 && React.createElement("div", { className: "feedback-warn mt-3" }, props.orderMessage)
  );
}

function CustomerForm(props) {
  return React.createElement(
    "form",
    { onSubmit: props.goToPaymentStep },
    React.createElement("h3", { className: "h5 fw-bold" }, "Customer Information"),
    React.createElement("label", { className: "form-label" }, "Name"),
    React.createElement("input", { className: "form-control mb-3", value: props.customerName, onChange: e => props.setCustomerName(e.target.value), placeholder: "Enter your name" }),
    React.createElement("label", { className: "form-label" }, "Email"),
    React.createElement("input", { className: "form-control mb-3", value: props.email, onChange: e => props.setEmail(e.target.value), placeholder: "name@email.com" }),
    React.createElement("label", { className: "form-label" }, "Shipping Address"),
    React.createElement("textarea", { className: "form-control mb-3", value: props.address, onChange: e => props.setAddress(e.target.value), rows: "3", placeholder: "Enter your address" }),
    React.createElement("button", { className: "btn main-button", type: "submit" }, "Continue to Payment")
  );
}

function PaymentForm(props) {
  return React.createElement(
    "form",
    { onSubmit: props.finishOrder },
    React.createElement("h3", { className: "h5 fw-bold" }, "Payment"),
    React.createElement("p", { className: "small-muted" }, "This is only a prototype payment form. No real payment is processed."),
    React.createElement("label", { className: "form-label" }, "Name on card"),
    React.createElement("input", { className: "form-control mb-3", value: props.cardName, onChange: e => props.setCardName(e.target.value), placeholder: "Name on card" }),
    React.createElement("label", { className: "form-label" }, "Card number"),
    React.createElement("input", { className: "form-control mb-3", value: props.cardNumber, onChange: e => props.setCardNumber(e.target.value), placeholder: "1234 1234 1234 1234" }),
    React.createElement("p", null, React.createElement("strong", null, "Order total: "), "$", props.total),
    React.createElement("button", { className: "btn main-button", type: "submit" }, "Place Order")
  );
}

function SurveyBox(props) {
  return React.createElement(
    "section",
    { id: "survey", className: "section-padding" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "survey-box" },
        React.createElement("h2", { className: "fw-bold" }, "How was your visit?"),
        React.createElement("p", null, "This short survey helps Cozy Desk make the shop easier and nicer to use."),
        React.createElement(
          "form",
          { onSubmit: props.sendSurvey },
          React.createElement("label", { className: "form-label" }, "Rating"),
          React.createElement(
            "select",
            { className: "form-select mb-3", value: props.surveyRating, onChange: e => props.setSurveyRating(e.target.value) },
            ["5", "4", "3", "2", "1"].map(rate => React.createElement("option", { key: rate }, rate))
          ),
          React.createElement("label", { className: "form-label" }, "Comment"),
          React.createElement("textarea", { className: "form-control mb-3", rows: "3", value: props.surveyComment, onChange: e => props.setSurveyComment(e.target.value), placeholder: "Tell us what was easy or confusing." }),
          React.createElement("button", { className: "btn main-button", type: "submit" }, "Send Feedback")
        ),
        props.surveyMessage !== "" && React.createElement("div", { className: "feedback-good mt-3" }, props.surveyMessage)
      )
    )
  );
}

function HeuristicNotes() {
  return React.createElement(
    "section",
    { id: "heuristics", className: "section-padding bg-light" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement("h2", { className: "fw-bold text-center mb-4" }, "Design and Heuristic Notes"),
      React.createElement(
        "div",
        { className: "row g-4" },
        [
          ["Visibility of system status", "The checkout pills show the user what step they are on."],
          ["Match between system and real world", "The cart, checkout, and product words match normal shopping language."],
          ["User control and freedom", "Users can clear filters and remove items from the cart."],
          ["Consistency and standards", "The same button and card styles are used across the site."],
          ["Error prevention", "Checkout checks for missing information before moving forward."],
          ["Recognition rather than recall", "Filters stay visible beside the product list."],
          ["Flexibility and efficiency of use", "Users can narrow products by several facets at the same time."],
          ["Aesthetic and minimalist design", "The layout uses white cards and spacing to avoid crowding."],
          ["Help users recognize and recover from errors", "Warning messages explain what needs to be fixed."],
          ["Help and documentation", "Small notes explain the prototype payment and product details."]
        ].map(item =>
          React.createElement(
            "div",
            { className: "col-md-6", key: item[0] },
            React.createElement(
              "div",
              { className: "note-card h-100" },
              React.createElement("h3", { className: "h5 product-title" }, item[0]),
              React.createElement("p", { className: "mb-0" }, item[1])
            )
          )
        )
      )
    )
  );
}

function ShopFooter() {
  return React.createElement(
    "footer",
    { className: "footer text-center" },
    React.createElement("div", { className: "container" }, "Cozy Desk Stationery Shop | Designed by Joy Yeung")
  );
}

root.render(React.createElement(CozyDeskApp));
