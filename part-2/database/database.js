const Table = require('cli-table2')
const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/hotel_db';
const client = new pg.Client(connectionString)
client.connect()

const getAllGuests = (callback) => {
  client.query('SELECT * FROM guests', (err, result) => {
    if(err) {
      callback(err.stack)
    } else {
      callback(result)
    }
  })
}

const listAllGuests = (result) => {
  const table = new Table({
    head: ['ID', 'Guest Name', 'Email']
    , colWidths: [5, 25, 34]
  })

  for(values of result.rows) {
    table.push(
      [values.id, values.name, values.email]
    )
  }
  console.log(table.toString())
}

const getRooms = (callback) => {
  client.query('SELECT room_number, capacity, check_in, check_out FROM rooms INNER JOIN bookings on rooms.id = bookings.room_id', (err, result) => {
    if(err) {
      callback(err.stack)
    } else {
      callback(result)
    }
  })
}

const listAllRooms = (result) => {
  const table = new Table({
    head: ['Room #', 'Capacity', 'Available']
    , colWidths: [10, 10, 12]
  })

  for(values of result.rows) {
    table.push(
      [values.room_number, values.capacity, isRoomAvailable(values.check_in, values.check_out)]
    )
  }
  console.log(table.toString())

}

const listAvailableRooms = (result) => {
  const table = new Table({
    head: ['Room #', 'Capacity', 'Available']
    , colWidths: [10, 10, 12]
  })

  for(values of result.rows) {
    if (isRoomAvailable(values.check_in, values.check_out)) {
      table.push(
        [values.room_number, values.capacity, true]
      )
    }
  }
  console.log(table.toString())
}

const isRoomAvailable = (check_in, check_out) => {
  let startDate = new Date(check_in), endDate = new Date(check_out), today = new Date()
  return (today < startDate || today > endDate)
}

const getCurrentAndFutureBookings = (callback) => {
  client.query('SELECT room_number, name, check_in, check_out FROM rooms INNER JOIN bookings on rooms.id = bookings.room_id JOIN guests on bookings.guest_id = guests.id WHERE check_out > now()::date ORDER BY check_in', (err, result) => {
    if(err) {
      callback(err.stack)
    } else {
      callback(result)
    }
  })
}

const listBookings = (result) => {
  const table = new Table({
    head: ['Room #', 'Guest Name', 'Check-In', 'Check-Out']
    , colWidths: [10, 20, 15, 15]
  })

  for(values of result.rows) {
    let checkin = new Date(values.check_in).toISOString().slice(0, 10)
    let checkout = new Date(values.check_out).toISOString().slice(0, 10)

    table.push(
      [values.room_number, values.name, checkin, checkout]
    )
  }
  console.log(table.toString())
}

const getBookingsForRoom = (room_num, callback) => {
  client.query('SELECT room_number, name, check_in, check_out FROM rooms INNER JOIN bookings on rooms.id = bookings.room_id JOIN guests on bookings.guest_id = guests.id WHERE room_number =$1 AND check_out > now()::date ORDER BY check_in;', [room_num], (err, result) => {
    if(err) {
      callback(err.stack)
    } else {
      callback(result)
    }
  })
}

const listBookingsForRoom = (result) => {
  const table = new Table({
    head: ['Room #', 'Guest Name', 'Check-In', 'Check-Out']
    , colWidths: [10, 20, 15, 15]
  })

  for(values of result.rows) {
    let checkin = new Date(values.check_in).toISOString().slice(0, 10)
    let checkout = new Date(values.check_out).toISOString().slice(0, 10)

    table.push(
      [values.room_number, values.name, checkin, checkout]
    )
  }
  console.log(table.toString())
}

module.exports = {
  getAllGuests,
  listAllGuests,
  getRooms,
  listAllRooms,
  listAvailableRooms,
  getBookingsForRoom,
  listBookingsForRoom,
  getCurrentAndFutureBookings,
  listBookings
}
