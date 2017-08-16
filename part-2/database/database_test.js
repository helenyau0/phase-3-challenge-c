const expect = require('chai').expect
const { getAllGuests, getRooms, getCurrentAndFutureBookings, getBookingsForRoom } = require('../database/database')

describe('database', () => {
  context('getAllGuests', () => {
    it('should be a function',  () => {
      expect(getAllGuests).to.be.a('function')
    })
    it('should list all guests with their id, name, and email', (done) => {
      getAllGuests(result => {
        expect(result).to.have.own.property('rows')
        expect(result.rows).to.be.a('array')
        expect(result.rows[0]).to.have.all.keys('id', 'name', 'email')
        expect(result.rows[0]).to.deep.include({ id: 1, name: 'Aurthur Velti', email: 'avelti0@live.com' })
        expect(result.rows[1]).to.deep.include({ id: 2, name: 'Kurtis Pougher', email: 'kpougher1@oakley.com' })
        expect(result.rows[2]).to.deep.include({ id: 3, name: 'Randy Thys', email: 'rthys2@reverbnation.com' })
        expect(result.rows).to.be.a('array')
        expect(result.rows.length).to.eql(20)
        done()
      })
    })
  })

  context('getRooms', () => {
    it('should be a function',  () => {
      expect(getRooms).to.be.a('function')
    })
    it('get all room numbers and capacity as well as check-in and check-out dates', (done) => {
      getRooms(result => {
        expect(result).to.be.an('object')
        expect(result).to.have.own.property('rows')
        expect(result.rows).to.be.a('array')
        expect(result.rowCount).to.eql(40)
        expect(result.rows[0]).to.have.all.keys('room_number', 'capacity', 'check_in', 'check_out')
        expect(result.rows[0]).to.deep.include(
          {
            room_number: '3B',
            capacity: 4,
            check_in: new Date('2018-06-03T07:00:00.000Z'),
            check_out: new Date('2018-06-12T07:00:00.000Z')
          }
        )
        expect(result.rows[1]).to.deep.include(
          {
            room_number: '3C',
            capacity: 3,
            check_in: new Date('2018-03-29T07:00:00.000Z'),
            check_out: new Date('2018-04-04T07:00:00.000Z')
          }
        )
        expect(result.rows[2]).to.deep.include(
          {
            room_number: '5A',
            capacity: 5,
            check_in: new Date('2017-08-12T07:00:00.000Z'),
            check_out: new Date('2017-08-26T07:00:00.000Z')
          }
        )

        done()
      })
    })
  })

  context('getCurrentAndFutureBookings', () => {
    it('should be a function',  () => {
      expect(getCurrentAndFutureBookings).to.be.a('function')
    })
    it('get all current and upcoming bookings', (done) => {
      getCurrentAndFutureBookings(result => {
        expect(result).to.be.an('object')
        expect(result).to.have.own.property('rows')
        expect(result.rows).to.be.a('array')
        expect(result.rows.length).to.eql(39)
        expect(result.rows[0]).to.have.all.keys('room_number', 'name', 'check_in', 'check_out')
        expect(result.rows[0]).to.deep.include(
          {
            room_number: '5A',
            name: 'Billi Coyne',
            check_in: new Date('2017-08-12T07:00:00.000Z'),
            check_out: new Date('2017-08-26T07:00:00.000Z')
          }
        )
        expect(result.rows[1]).to.deep.include(
          {
            room_number: '3A',
            name: 'Chicky Bouldon',
            check_in: new Date('2017-08-18T07:00:00.000Z'),
            check_out: new Date('2017-08-31T07:00:00.000Z')
          }
        )
        expect(result.rows[2]).to.deep.include(
          {
            room_number: '5A',
            name: 'Janie Powers',
            check_in: new Date('2017-08-18T07:00:00.000Z'),
            check_out: new Date('2017-08-28T07:00:00.000Z')
          }
        )

        done()
      })
    })
  })

  context('getBookingsForRoom', () => {
    it('should be a function',  () => {
      expect(getBookingsForRoom).to.be.a('function')
    })
    it('should get all bookings for a specific room given the room number', (done) => {
      let roomNum = '3B'
      getBookingsForRoom(roomNum, result => {
        expect(result).to.have.own.property('rows')
        expect(result.rows).to.be.a('array')
        expect(result.rowCount).to.eql(3)
        expect(result.rows[0]).to.have.all.keys('room_number', 'name', 'check_in', 'check_out')
        expect(result.rows[0]).to.deep.include(
          {
            room_number: '3B',
            name: 'Randy Thys',
            check_in: new Date('2017-12-15T08:00:00.000Z'),
            check_out: new Date('2017-12-16T08:00:00.000Z')
          }
        )
        expect(result.rows[1]).to.deep.include(
          {
            room_number: '3B',
            name: 'Enos Semark',
            check_in: new Date('2018-02-06T08:00:00.000Z'),
            check_out: new Date('2018-02-17T08:00:00.000Z')
          }
        )
        expect(result.rows[2]).to.deep.include(
          {
            room_number: '3B',
            name: 'Janie Powers',
            check_in: new Date('2018-06-03T07:00:00.000Z'),
            check_out: new Date('2018-06-12T07:00:00.000Z')
          }
        )

        done()
      })
    })
  })
})
