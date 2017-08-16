COPY guests(id, name, email)
FROM '/Users/helen/Desktop/Phase 2/phase-3-challenge-c/part-2/database/guests.csv' DELIMITER ',' CSV HEADER;

COPY rooms(id,room_number,capacity)
FROM '/Users/helen/Desktop/Phase 2/phase-3-challenge-c/part-2/database/rooms.csv' DELIMITER ',' CSV HEADER;

COPY bookings(id, room_id, guest_id, check_in, check_out)
FROM '/Users/helen/Desktop/Phase 2/phase-3-challenge-c/part-2/database/bookings.csv' DELIMITER ',' CSV HEADER;
