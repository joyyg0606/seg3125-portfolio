const root = ReactDOM.createRoot(document.getElementById("root"));

const gardenThemes = {
  Nature: ["🌿", "🌸", "🍄", "🌙", "☀️", "🌧️", "🍃", "⭐", "🌻"],
  Fruit: ["🍓", "🍋", "🍇", "🍑", "🍒", "🥝", "🍍", "🍎", "🍉"],
  Shapes: ["●", "■", "▲", "◆", "★", "♥", "⬟", "⬢", "✦"]
};

const gardenLevels = {
  Beginner: { tiles: 4, startSize: 3, totalRounds: 3, speed: 720 },
  Regular: { tiles: 6, startSize: 4, totalRounds: 4, speed: 640 },
  Challenge: { tiles: 9, startSize: 5, totalRounds: 5, speed: 560 }
};

function PatternGardenPage() {
  const [gardenLevel, setGardenLevel] = React.useState("Beginner");
  const [gardenTheme, setGardenTheme] = React.useState("Nature");
  const [gardenRound, setGardenRound] = React.useState(1);
  const [gardenPattern, setGardenPattern] = React.useState([]);
  const [playerPath, setPlayerPath] = React.useState([]);
  const [litTile, setLitTile] = React.useState(null);
  const [playState, setPlayState] = React.useState("setup");
  const [gardenMessage, setGardenMessage] = React.useState("Choose a level and tile theme, then start the game.");
  const [missedClicks, setMissedClicks] = React.useState(0);

  const levelRules = gardenLevels[gardenLevel];
  const visibleTiles = gardenThemes[gardenTheme].slice(0, levelRules.tiles);

  function growPattern(size) {
    const pattern = [];

    for (let spot = 0; spot < size; spot++) {
      pattern.push(Math.floor(Math.random() * levelRules.tiles));
    }

    return pattern;
  }

  function beginGardenRun() {
    const firstRoundPattern = growPattern(levelRules.startSize);

    setGardenRound(1);
    setMissedClicks(0);
    setGardenPattern(firstRoundPattern);
    setPlayerPath([]);
    setGardenMessage("Watch the tiles carefully, then repeat the same path.");

    showGardenPattern(firstRoundPattern);
  }

  function showGardenPattern(pattern) {
    setPlayState("watching");
    setLitTile(null);

    pattern.forEach((tileNumber, spot) => {
      setTimeout(() => setLitTile(tileNumber), levelRules.speed * spot + 300);
      setTimeout(() => setLitTile(null), levelRules.speed * spot + 580);
    });

    setTimeout(() => {
      setPlayState("playing");
      setGardenMessage("Your turn. Click the tiles in the same order.");
    }, levelRules.speed * pattern.length + 450);
  }

  function tapGardenTile(tileNumber) {
    if (playState !== "playing") {
      return;
    }

    const nextPlayerPath = playerPath.concat(tileNumber);
    const currentSpot = nextPlayerPath.length - 1;

    if (gardenPattern[currentSpot] !== tileNumber) {
      setMissedClicks(missedClicks + 1);
      setPlayState("waiting");
      setPlayerPath([]);
      setGardenMessage("That tile was not in the pattern. Watch it again and retry.");

      setTimeout(() => showGardenPattern(gardenPattern), 1000);
      return;
    }

    setPlayerPath(nextPlayerPath);

    if (nextPlayerPath.length === gardenPattern.length) {
      if (gardenRound === levelRules.totalRounds) {
        setPlayState("done");
        setGardenMessage("Finished. You completed the full memory path for this level.");
        return;
      }

      const nextRound = gardenRound + 1;
      const nextPattern = growPattern(levelRules.startSize + nextRound - 1);

      setGardenRound(nextRound);
      setGardenPattern(nextPattern);
      setPlayerPath([]);
      setPlayState("waiting");
      setGardenMessage("Nice. The next path has one more step.");

      setTimeout(() => showGardenPattern(nextPattern), 1200);
    }
  }

  function clearGardenRun() {
    setGardenRound(1);
    setGardenPattern([]);
    setPlayerPath([]);
    setLitTile(null);
    setPlayState("setup");
    setMissedClicks(0);
    setGardenMessage("Choose a level and tile theme, then start the game.");
  }

  function switchGardenLevel(value) {
    setGardenLevel(value);
    setGardenRound(1);
    setGardenPattern([]);
    setPlayerPath([]);
    setLitTile(null);
    setPlayState("setup");
    setMissedClicks(0);
    setGardenMessage("Level changed. Start the game when ready.");
  }

  function switchGardenTheme(value) {
    setGardenTheme(value);
    setGardenRound(1);
    setGardenPattern([]);
    setPlayerPath([]);
    setLitTile(null);
    setPlayState("setup");
    setMissedClicks(0);
    setGardenMessage("Theme changed. Start the game when ready.");
  }

  return React.createElement(
    "div",
    null,
    React.createElement(GardenNavigation),
    React.createElement(GardenIntro),
    React.createElement(
      "section",
      { id: "play", className: "section-space" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row g-4 align-items-start" },
          React.createElement(
            "div",
            { className: "col-lg-4" },
            React.createElement(GardenSettings, {
              gardenLevel,
              gardenTheme,
              switchGardenLevel,
              switchGardenTheme,
              beginGardenRun,
              clearGardenRun,
              playState
            }),
            React.createElement(GardenProgress, {
              gardenRound,
              levelRules,
              missedClicks,
              gardenPattern,
              playerPath
            })
          ),
          React.createElement(
            "div",
            { className: "col-lg-8" },
            React.createElement(GardenBoard, {
              visibleTiles,
              litTile,
              tapGardenTile,
              playState,
              gardenMessage
            })
          )
        )
      )
      
    ),
    React.createElement(GardenDesignNotes),
    React.createElement(GardenFooter)
  );
}

function GardenNavigation() {
  return React.createElement(
    "nav",
    { className: "navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement("a", { className: "navbar-brand fw-bold", href: "#home" }, "Pattern Garden"),
      React.createElement(
        "div",
        { className: "ms-auto" },
        React.createElement("a", { className: "nav-link d-inline mx-2", href: "#play" }, "Play"),
        React.createElement("a", { className: "nav-link d-inline mx-2", href: "#design" }, "Design Notes"),
        React.createElement("a", { className: "nav-link d-inline mx-2", href: "index.html" }, "Portfolio")
      )

    )
  );
}

function GardenIntro() {
  return React.createElement(
    "header",
    { id: "home", className: "game-hero" },
    React.createElement(
      "div",
      { className: "container text-center" },
      React.createElement("span", { className: "game-tag" }, "Memory sequence game"),
      React.createElement("h1", { className: "display-4 fw-bold" }, "Watch the pattern. Repeat it back."),
      React.createElement(
        "p",
        { className: "lead mt-3" },
        "Pattern Garden is a small memory game where the player watches a tile pattern and repeats it in the same order."
      ),
      React.createElement("a", { href: "#play", className: "btn garden-button mt-3" }, "Start Playing")
    )
  );
}

function GardenSettings(props) {

  return React.createElement(
    "div",
    { className: "panel-card mb-4" },
    React.createElement("h2", { className: "h4 fw-bold" }, "Game Setup"),
    React.createElement("p", { className: "small-note" }, "Choose the memory difficulty and the tile theme."),

    React.createElement("label", { className: "form-label" }, "Level"),
    React.createElement(
      "select",
      {
        className: "form-select mb-3",
        value: props.gardenLevel,
        onChange: event => props.switchGardenLevel(event.target.value)
      },
      Object.keys(gardenLevels).map(item => React.createElement("option", { key: item }, item))
    ),


    React.createElement("label", { className: "form-label" }, "Tile theme"),
    React.createElement(
      "select",
      {
        className: "form-select mb-3",
        value: props.gardenTheme,
        onChange: event => props.switchGardenTheme(event.target.value)
      },
      Object.keys(gardenThemes).map(item => React.createElement("option", { key: item }, item))
    ),

    React.createElement(
      "div",
      { className: "d-flex gap-2 flex-wrap" },
      React.createElement(
        "button",
        { className: "btn garden-button", onClick: props.beginGardenRun },
        props.playState === "setup" ? "Start Game" : "Restart"
      ),
      React.createElement("button", { className: "btn light-button", onClick: props.clearGardenRun }, "Reset")
    )
  );
}

function GardenProgress(props) {

  return React.createElement(
    "div",
    { className: "score-card" },
    React.createElement("h3", { className: "h5 fw-bold" }, "Progress"),
    React.createElement("p", null, React.createElement("strong", null, "Round: "), props.gardenRound, " of ", props.levelRules.totalRounds),
    React.createElement("p", null, React.createElement("strong", null, "Pattern length: "), props.gardenPattern.length || props.levelRules.startSize),
    React.createElement("p", null, React.createElement("strong", null, "Your steps: "), props.playerPath.length),
    React.createElement("p", { className: "mb-0" }, React.createElement("strong", null, "Mistakes: "), props.missedClicks)
  );
}

function GardenBoard(props) {
  const messageClass = props.playState === "done" ? "result-good mb-4" : "result-warn mb-4";

  return React.createElement(
    "div",
    { className: "game-card" },
    React.createElement("div", { className: messageClass }, props.gardenMessage),
    React.createElement(
      "div",
      { className: "tile-board" },
      props.visibleTiles.map((tile, index) =>
        React.createElement(
          "button",
          {
            key: index,
            className: props.litTile === index ? "memory-tile active" : "memory-tile",
            onClick: () => props.tapGardenTile(index),
            disabled: props.playState === "watching" || props.playState === "waiting" || props.playState === "done"
          },
          tile
        )
      )
    )
  );
}


function GardenDesignNotes() {
  return React.createElement(
    "section",
    { id: "design", className: "section-space bg-light" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement("h2", { className: "fw-bold text-center mb-4" }, "Design Notes"),
      React.createElement(
        "div",
        { className: "row g-4" },
        React.createElement(
          "div",
          { className: "col-md-4" },
          React.createElement(
            "div",
            { className: "note-card h-100" },
            React.createElement("h4", null, "Similarity"),
            React.createElement("p", null, "The tiles use the same shape and size so the player can quickly understand that they belong to one game group.")
          )
        ),
        React.createElement(
          "div",
          { className: "col-md-4" },
          React.createElement(
            "div",
            { className: "note-card h-100" },
            React.createElement("h4", null, "Figure and Ground"),
            React.createElement("p", null, "The active tile becomes visually stronger so the player can focus on the current step of the pattern.")
          )
        ),
        React.createElement(
          "div",
          { className: "col-md-4" },
          React.createElement(
            "div",
            { className: "note-card h-100" },
            React.createElement("h4", null, "Focused Layout"),
            React.createElement("p", null, "The setup area stays separate from the tile board so the player can focus on remembering the pattern.")
          )
        )
      )
    )
  );
}


function GardenFooter() {
  return React.createElement(
    "footer",
    { className: "footer text-center" },
    React.createElement("div", { className: "container" }, "Pattern Garden Memory Game | Designed by Joy Yeung")
  );
}

root.render(React.createElement(PatternGardenPage));