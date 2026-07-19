// Close the small-screen menu after a portfolio link is selected.
const joyPortfolioLinks = document.querySelectorAll("#joyPortfolioMenu .nav-link");
const joyPortfolioMenu = document.getElementById("joyPortfolioMenu");

joyPortfolioLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (joyPortfolioMenu.classList.contains("show")) {
      const openMenu = bootstrap.Collapse.getOrCreateInstance(joyPortfolioMenu);
      openMenu.hide();
    }
  });
});
