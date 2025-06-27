import React, { useState, useEffect } from 'react';
import { rooms, applications } from '../services/api';
import SimpleBookingForm from './SimpleBookingForm';
import './RoomList.css';

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await rooms.getAll();
      setRoomList(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch rooms');
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (roomId) => {
    setSelectedRoomId(roomId);
    setShowBookingForm(true);
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
    setSelectedRoomId(null);
  };

  const handleSubmitApplication = async (formData) => {
    try {
      const response = await applications.submit(formData);
      console.log('Application submitted:', response.data);
      alert('Application submitted successfully! We will contact you soon.');
      handleCloseForm();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading rooms...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="room-list">
      <h2>Available Rooms</h2>
      {roomList.length === 0 ? (
        <p className="no-rooms">No rooms available at the moment.</p>
      ) : (
        <div className="room-grid">
          {roomList.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-header">
                <h3>Room {room.room_number}</h3>
                <span className={`status ${room.status}`}>{room.status}</span>
              </div>
              <div className="room-details">
                <p><strong>Floor:</strong> {room.floor}</p>
                <p><strong>Capacity:</strong> {room.capacity} person(s)</p>
                <p><strong>Rent:</strong> ₹{room.monthly_rent}/month</p>
                <p><strong>Deposit:</strong> ₹{room.security_deposit}</p>
                {room.description && <p className="description">{room.description}</p>}
                {room.amenities && (
                  <div className="amenities">
                    <strong>Amenities:</strong>
                    <div className="amenity-tags">
                      {room.amenities.split(',').map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}
                {room.property_name && (
                  <p className="property-info">
                    <strong>Property:</strong> {room.property_name}, {room.city}
                  </p>
                )}
              </div>
              {room.status === 'available' && (
                <button 
                  className="book-now-btn"
                  onClick={() => handleBookRoom(room.id)}
                >
                  Book Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      
      {showBookingForm && (
        <SimpleBookingForm
          roomId={selectedRoomId}
          onClose={handleCloseForm}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
};

export default RoomList;