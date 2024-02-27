import icon from "../assets/HC_LOGO_LIGHT_48x48.png";
document.getElementById("favicon").href = icon;

window.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "Home":
      window.location.href = window.location.origin;
      break;
    case "H":
      window.history.back();
      break;
    case "L":
      window.history.forward();
      break;
    case "j":
      window.scrollBy({ top: 50, behavior: "smooth" });
      break;
    case "k":
      window.scrollBy({ top: -50, behavior: "smooth" });
      break;
    case "d":
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      break;
    case "u":
      window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
      break;
  }
});
