const foodPriceRoot = ReactDOM.createRoot(document.getElementById("foodPriceRoot"));
const make = React.createElement;

// Small Statistics Canada subset used for this course dashboard.
// The order of the three values is May 2025, April 2026, and May 2026.
const joyVegetableRows = [
  {
    code: "allVeg",
    english: "Vegetables and vegetable preparations",
    french: "Légumes et préparations à base de légumes",
    indexValues: [193.4, 198.9, 207.4]
  },
  {
    code: "freshVeg",
    english: "Fresh vegetables",
    french: "Légumes frais",
    indexValues: [192.5, 198.9, 209.8]
  },
  {
    code: "otherFreshVeg",
    english: "Other fresh vegetables",
    french: "Autres légumes frais",
    indexValues: [227.8, 221.5, 245.7]
  },
  {
    code: "preservedVeg",
    english: "Preserved vegetables and vegetable preparations",
    french: "Légumes en conserve et préparations à base de légumes",
    indexValues: [196.8, 199.2, 202.5]
  },
  {
    code: "frozenVeg",
    english: "Frozen and dried vegetables",
    french: "Légumes surgelés et séchés",
    indexValues: [205.2, 195.4, 207.8]
  },
  {
    code: "cannedVeg",
    english: "Canned vegetables and other vegetable preparations",
    french: "Légumes en conserve et autres préparations à base de légumes",
    indexValues: [195.0, 204.9, 204.0]
  }
];

const joyDashboardMonths = [
  { english: "May 2025", french: "Mai 2025" },
  { english: "April 2026", french: "Avril 2026" },
  { english: "May 2026", french: "Mai 2026" }
];

// I kept the English and French wording together so it is easy to check both versions.
const foodPriceWording = {
  en: {
    brand: "Food Price View",
    dashboardLink: "Dashboard",
    dataLink: "Data Table",
    portfolioLink: "Portfolio",
    languageLabel: "Language",
    introTag: "Canadian food price dashboard",
    pageTitle: "Canadian Vegetable Price Index",
    introText: "Explore how selected vegetable price indexes changed in Canada between May 2025 and May 2026.",
    indexNote: "The values are Consumer Price Index values where 2002 equals 100. They are not product prices in dollars.",
    latestPeriod: "Latest period",
    highestGroup: "Highest group",
    highestValue: "Highest index",
    averageValue: "Average index",
    compareHeading: "Compare vegetable groups",
    compareHelp: "Choose a month to compare all six vegetable groups at the same point in time.",
    monthLabel: "Month",
    trendHeading: "Follow one group over time",
    trendHelp: "Choose a vegetable group to see how its index changed across the three available periods.",
    groupLabel: "Vegetable group",
    indexAxis: "Price index (2002 = 100)",
    barChartTitle: "Vegetable price index by group",
    lineChartTitle: "Vegetable price index over time",
    tableHeading: "Data used in the dashboard",
    tableHelp: "This table gives the exact values shown in the two charts.",
    productGroup: "Product group",
    sourceHeading: "Data source",
    sourceText: "Statistics Canada, Table 18-10-0004-03. I copied six vegetable product groups and three reference periods for this course dashboard.",
    useHeading: "How to use this dashboard",
    useText: "Use the month menu above the bar chart and the product group menu above the line chart. The language menu changes the page text, controls, dates, and chart labels.",
    chartLoadError: "The chart could not load. Please check the internet connection and refresh the page.",
    footer: "Food Price View | Designed by Joy Yeung"
  },
  fr: {
    brand: "Vue des prix alimentaires",
    dashboardLink: "Tableau de bord",
    dataLink: "Tableau de données",
    portfolioLink: "Portfolio",
    languageLabel: "Langue",
    introTag: "Tableau de bord des prix alimentaires au Canada",
    pageTitle: "Indice canadien des prix des légumes",
    introText: "Explorez l'évolution de certains indices des prix des légumes au Canada entre mai 2025 et mai 2026.",
    indexNote: "Les valeurs sont des indices des prix à la consommation où 2002 égale 100. Il ne s'agit pas de prix en dollars.",
    latestPeriod: "Période la plus récente",
    highestGroup: "Groupe le plus élevé",
    highestValue: "Indice le plus élevé",
    averageValue: "Indice moyen",
    compareHeading: "Comparer les groupes de légumes",
    compareHelp: "Choisissez un mois pour comparer les six groupes de légumes au même moment.",
    monthLabel: "Mois",
    trendHeading: "Suivre un groupe dans le temps",
    trendHelp: "Choisissez un groupe de légumes pour voir l'évolution de son indice pendant les trois périodes.",
    groupLabel: "Groupe de légumes",
    indexAxis: "Indice des prix (2002 = 100)",
    barChartTitle: "Indice des prix des légumes par groupe",
    lineChartTitle: "Indice des prix des légumes dans le temps",
    tableHeading: "Données utilisées dans le tableau de bord",
    tableHelp: "Ce tableau présente les valeurs exactes affichées dans les deux graphiques.",
    productGroup: "Groupe de produits",
    sourceHeading: "Source des données",
    sourceText: "Statistique Canada, tableau 18-10-0004-03. J'ai copié six groupes de produits de légumes et trois périodes de référence pour ce tableau de bord de cours.",
    useHeading: "Comment utiliser ce tableau de bord",
    useText: "Utilisez le menu des mois au-dessus du graphique à barres et le menu des groupes de produits au-dessus du graphique linéaire. Le menu de langue modifie le texte, les commandes, les dates et les étiquettes des graphiques.",
    chartLoadError: "Le graphique n'a pas pu se charger. Vérifiez la connexion Internet et actualisez la page.",
    footer: "Vue des prix alimentaires | Conçu par Joy Yeung"
  }
};

function JoyFoodPriceView() {
  const [pageLanguage, setPageLanguage] = React.useState("en");
  const [comparisonMonth, setComparisonMonth] = React.useState(2);
  const [trendChoice, setTrendChoice] = React.useState("freshVeg");
  const [barProblem, setBarProblem] = React.useState("");
  const [lineProblem, setLineProblem] = React.useState("");

  const barCanvas = React.useRef(null);
  const lineCanvas = React.useRef(null);
  const barChartCopy = React.useRef(null);
  const lineChartCopy = React.useRef(null);

  const copy = foodPriceWording[pageLanguage];
  const nameSide = pageLanguage === "en" ? "english" : "french";
  const numberLocale = pageLanguage === "en" ? "en-CA" : "fr-CA";

  const may2026Numbers = joyVegetableRows.map(row => row.indexValues[2]);
  const topMayValue = Math.max(...may2026Numbers);
  const topMayRow = joyVegetableRows.find(row => row.indexValues[2] === topMayValue);
  const mayAverage = may2026Numbers.reduce((total, number) => total + number, 0) / may2026Numbers.length;

  function showNumber(number) {
    return new Intl.NumberFormat(numberLocale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(number);
  }

  React.useEffect(() => {
    document.documentElement.lang = pageLanguage;
  }, [pageLanguage]);

  // Rebuild the comparison chart whenever its month or language changes.
  React.useEffect(() => {
    if (!window.Chart || !barCanvas.current) {
      setBarProblem(copy.chartLoadError);
      return;
    }

    setBarProblem("");
    if (barChartCopy.current) {
      barChartCopy.current.destroy();
    }

    const monthNumbers = joyVegetableRows.map(row => row.indexValues[comparisonMonth]);
    const biggestNumber = Math.max(...monthNumbers);

    barChartCopy.current = new Chart(barCanvas.current, {
      type: "bar",
      data: {
        labels: joyVegetableRows.map(row => row[nameSide]),
        datasets: [{
          data: monthNumbers,
          backgroundColor: monthNumbers.map(number => number === biggestNumber ? "#d98f4e" : "#3f7d78"),
          borderRadius: 5
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: copy.barChartTitle + " - " + joyDashboardMonths[comparisonMonth][nameSide],
            color: "#233332",
            font: { size: 16 }
          },
          tooltip: {
            callbacks: {
              label: item => copy.indexAxis + ": " + showNumber(item.raw)
            }
          }
        },
        scales: {
          x: {
            beginAtZero: false,
            title: { display: true, text: copy.indexAxis },
            ticks: { callback: number => showNumber(number) },
            grid: { color: "rgba(35, 51, 50, 0.08)" }
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
          }
        }
      }
    });

    return () => {
      if (barChartCopy.current) {
        barChartCopy.current.destroy();
        barChartCopy.current = null;
      }
    };
  }, [pageLanguage, comparisonMonth]);

  // The trend chart follows only one product group at a time.
  React.useEffect(() => {
    const chosenRow = joyVegetableRows.find(row => row.code === trendChoice);

    if (!chosenRow || !window.Chart || !lineCanvas.current) {
      setLineProblem(copy.chartLoadError);
      return;
    }

    setLineProblem("");
    if (lineChartCopy.current) {
      lineChartCopy.current.destroy();
    }

    lineChartCopy.current = new Chart(lineCanvas.current, {
      type: "line",
      data: {
        labels: joyDashboardMonths.map(month => month[nameSide]),
        datasets: [{
          label: chosenRow[nameSide],
          data: chosenRow.indexValues,
          borderColor: "#245c5a",
          backgroundColor: "rgba(36, 92, 90, 0.12)",
          pointBackgroundColor: "#d98f4e",
          pointBorderColor: "#d98f4e",
          pointRadius: 5,
          borderWidth: 3,
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { boxWidth: 14 } },
          title: {
            display: true,
            text: copy.lineChartTitle,
            color: "#233332",
            font: { size: 16 }
          },
          tooltip: {
            callbacks: {
              label: item => copy.indexAxis + ": " + showNumber(item.raw)
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: { display: true, text: copy.indexAxis },
            ticks: { callback: number => showNumber(number) },
            grid: { color: "rgba(35, 51, 50, 0.08)" }
          },
          x: { grid: { display: false } }
        }
      }
    });

    return () => {
      if (lineChartCopy.current) {
        lineChartCopy.current.destroy();
        lineChartCopy.current = null;
      }
    };
  }, [pageLanguage, trendChoice]);

  const summaryBoxes = [
    [copy.latestPeriod, joyDashboardMonths[2][nameSide]],
    [copy.highestGroup, topMayRow[nameSide]],
    [copy.highestValue, showNumber(topMayValue)],
    [copy.averageValue, showNumber(mayAverage)]
  ];

  return make(
    "div",
    null,

    make(
      "nav",
      { className: "navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top food-topbar" },
      make(
        "div",
        { className: "container" },
        make("a", { className: "navbar-brand fw-bold", href: "#foodHome" }, copy.brand),
        make(
          "div",
          { className: "ms-auto d-flex align-items-center gap-2" },
          make("a", { className: "nav-link d-none d-md-inline", href: "#foodDashboard" }, copy.dashboardLink),
          make("a", { className: "nav-link d-none d-md-inline", href: "#foodData" }, copy.dataLink),
          make("a", { className: "nav-link d-none d-md-inline", href: "index.html" }, copy.portfolioLink),
          make(
            "select",
            {
              className: "form-select form-select-sm food-language-choice",
              value: pageLanguage,
              onChange: event => setPageLanguage(event.target.value),
              "aria-label": copy.languageLabel
            },
            make("option", { value: "en" }, "English"),
            make("option", { value: "fr" }, "Français")
          )
        )
      )
    ),

    make(
      "header",
      { id: "foodHome", className: "food-view-intro" },
      make(
        "div",
        { className: "container text-center" },
        make("span", { className: "food-view-tag" }, copy.introTag),
        make("h1", { className: "display-4 fw-bold" }, copy.pageTitle),
        make("p", { className: "lead mt-3 mx-auto food-intro-text" }, copy.introText),
        make("div", { className: "joy-index-note mt-4 mx-auto text-start" }, copy.indexNote)
      )
    ),

    make(
      "main",
      null,
      make(
        "section",
        { id: "foodDashboard", className: "food-section-space" },
        make(
          "div",
          { className: "container" },
          make(
            "div",
            { className: "row g-3 mb-4" },
            summaryBoxes.map((box, boxNumber) =>
              make(
                "div",
                { className: "col-sm-6 col-xl-3", key: boxNumber },
                make(
                  "div",
                  { className: "price-summary-box" },
                  make("p", { className: "price-summary-label" }, box[0]),
                  make("p", { className: "price-summary-value" }, box[1])
                )
              )
            )
          ),

          make(
            "div",
            { className: "row g-4" },
            make(
              "div",
              { className: "col-xl-6" },
              make(
                "section",
                { className: "veg-chart-panel h-100", "aria-labelledby": "compareChartHeading" },
                make("h2", { id: "compareChartHeading", className: "h4 fw-bold" }, copy.compareHeading),
                make("p", { className: "chart-help" }, copy.compareHelp),
                make("label", { className: "form-label", htmlFor: "compareMonth" }, copy.monthLabel),
                make(
                  "select",
                  {
                    id: "compareMonth",
                    className: "form-select mb-4",
                    value: comparisonMonth,
                    onChange: event => setComparisonMonth(Number(event.target.value))
                  },
                  joyDashboardMonths.map((month, monthNumber) =>
                    make("option", { value: monthNumber, key: monthNumber }, month[nameSide])
                  )
                ),
                barProblem && make("div", { className: "chart-problem" }, barProblem),
                make("div", { className: "food-chart-space" }, make("canvas", { ref: barCanvas }))
              )
            ),

            make(
              "div",
              { className: "col-xl-6" },
              make(
                "section",
                { className: "veg-chart-panel h-100", "aria-labelledby": "trendChartHeading" },
                make("h2", { id: "trendChartHeading", className: "h4 fw-bold" }, copy.trendHeading),
                make("p", { className: "chart-help" }, copy.trendHelp),
                make("label", { className: "form-label", htmlFor: "trendVegetable" }, copy.groupLabel),
                make(
                  "select",
                  {
                    id: "trendVegetable",
                    className: "form-select mb-4",
                    value: trendChoice,
                    onChange: event => setTrendChoice(event.target.value)
                  },
                  joyVegetableRows.map(row =>
                    make("option", { value: row.code, key: row.code }, row[nameSide])
                  )
                ),
                lineProblem && make("div", { className: "chart-problem" }, lineProblem),
                make("div", { className: "food-chart-space" }, make("canvas", { ref: lineCanvas }))
              )
            )
          )
        )
      ),

      make(
        "section",
        { id: "foodData", className: "food-section-space bg-white" },
        make(
          "div",
          { className: "container" },
          make(
            "div",
            { className: "food-data-box" },
            make("h2", { className: "fw-bold" }, copy.tableHeading),
            make("p", null, copy.tableHelp),
            make(
              "div",
              { className: "table-responsive" },
              make(
                "table",
                { className: "table veg-index-table align-middle" },
                make(
                  "thead",
                  null,
                  make(
                    "tr",
                    null,
                    make("th", null, copy.productGroup),
                    joyDashboardMonths.map((month, monthNumber) =>
                      make("th", { key: monthNumber }, month[nameSide])
                    )
                  )
                ),
                make(
                  "tbody",
                  null,
                  joyVegetableRows.map(row =>
                    make(
                      "tr",
                      { key: row.code },
                      make("td", null, row[nameSide]),
                      row.indexValues.map((number, numberSpot) =>
                        make("td", { key: numberSpot }, showNumber(number))
                      )
                    )
                  )
                )
              )
            ),
            make(
              "div",
              { className: "joy-index-note mt-4" },
              make("strong", null, copy.sourceHeading + ": "),
              copy.sourceText,
              " ",
              make(
                "a",
                {
                  href: "https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000403",
                  target: "_blank",
                  rel: "noreferrer"
                },
                "Statistics Canada"
              )
            )
          )
        )
      ),

      make(
        "section",
        { className: "food-section-space" },
        make(
          "div",
          { className: "container" },
          make(
            "div",
            { className: "food-howto-box" },
            make("h2", { className: "h4 fw-bold" }, copy.useHeading),
            make("p", { className: "mb-0" }, copy.useText)
          )
        )
      )
    ),

    make(
      "footer",
      { className: "food-view-footer text-center" },
      make("div", { className: "container" }, copy.footer)
    )
  );
}

foodPriceRoot.render(make(JoyFoodPriceView));
