// Open Modal
Array.from(document.getElementsByClassName('hotelrooms')).forEach(element => {
  element.addEventListener('click', (event) => {
    let childNodes = event.target.parentElement.parentElement.children
    let room = childNodes[0].innerText, price = childNodes[2].innerText

    document.querySelector('.modal').style.display = 'block'
    bookRoom(room, price)

    // Get current nights and update pricing
    document.getElementById('nights').addEventListener('input', (event) => {
      let nights = event.target.value
      let total = calculateFinalPrice(price.substring(1), nights)
      document.getElementById('totalPrice').innerText = total.toFixed(2)
    })
  }, false)
})

//Close Modal
document.querySelector('.close').addEventListener('click', (event) => {
  document.querySelector('.modal').style.display = 'none'
  removeRoom()
})

const bookRoom = (room, price) => {
  document.getElementById('all-rooms').innerHTML = `Room ${room}`
  document.getElementById('price-per-night').innerHTML = `${price}/night`
}

const removeRoom = () => {
  document.getElementById('nights').value = 0
  document.getElementById('totalPrice').innerHTML = '0'
  document.getElementById('bookingDate').value = ''
}

const calculateFinalPrice = (price, nights) => {
  return price * nights
}
