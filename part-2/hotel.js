const { getAllGuests, listAllGuests, getRooms, listAllRooms, listAvailableRooms, getBookingsForRoom, listBookingsForRoom, getCurrentAndFutureBookings, listBookings } = require('./database/database')

const manageHotel = () => {
  const command = process.argv[2]
  const input = process.argv[3]

  if(command === 'guests') {
    getAllGuests(listAllGuests)
  } else if(command === 'rooms') {
    if(input === '--available') {
      getRooms(listAvailableRooms)
    } else {
      getRooms(listAllRooms)
    }
  } else if(command === 'bookings' && input) {
    getBookingsForRoom(input, listBookingsForRoom)
  } else if(command === 'bookings' && !input) {
    getCurrentAndFutureBookings(listBookings)
  }
}

manageHotel()
