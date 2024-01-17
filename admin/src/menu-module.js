export default (() => {
  // En este caso la variable "square" hace referencia a un elemento
  // HTML que se encuentra en el archivo index.html, que tiene una id "square".
  const menuButton = document.querySelector('.menu-button')
  const menu = document.querySelector('.menu')
  // En la siguiente linea se establece un evento que se ejecutara cada vez
  // que se presione el elemento de la variable square (es decir, el elemento
  // HTML que tiene una id "square"). Aquí una lista de los eventos disponibles
  // en javascript: https://www.w3schools.com/jsref/dom_obj_event.asp

  menuButton?.addEventListener('click', () => {
    // En la siguiente línea se añade una clase "active" al elemento HTML que tiene
    // una id "square" si no tiene la clase, y se la quita si la tiene.
    menuButton.classList.toggle('active')
    menu.classList.toggle('menu-active')
  })
})()
