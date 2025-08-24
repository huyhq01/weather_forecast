document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".chip");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.removeAttribute("aria-selected"));
      chip.setAttribute("aria-selected", "true");
    });
  });
});

// weather api return 7 days 
// get current date then loop spawm 7 buttons for each day