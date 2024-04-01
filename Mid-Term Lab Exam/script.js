var logo = document.getElementById("img-name");
var images = document.querySelectorAll('img');

images.forEach(image => {
    // Add 'mouseover' event listener
    image.addEventListener('mouseover', () => {
      // Add the 'hovered' class on mouseover
      logo.innerHTML = "Photo Hovered";
    });

    // Add 'mouseout' event listener
    image.addEventListener('mouseout', () => {
      // Remove the 'hovered' class on mouseout
      logo.innerHTML = "";
    });
});
