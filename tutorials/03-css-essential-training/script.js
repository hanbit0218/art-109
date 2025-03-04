document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("footer");

  function showFooter() {
      footer.style.bottom = "0";
      footer.style.opacity = "1";
  }

  function hideFooter() {
      footer.style.bottom = "-80px";
      footer.style.opacity = "0";
  }

  document.addEventListener("mousemove", function (event) {
      const isHoveringBottom = event.clientY >= window.innerHeight - 5;
      const isHoveringFooter = footer.matches(":hover");

      if (isHoveringBottom || isHoveringFooter) {
          showFooter();
      } else {
          hideFooter();
      }
  });
});
