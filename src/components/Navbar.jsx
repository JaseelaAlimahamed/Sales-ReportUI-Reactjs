import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; 
import './Navbar.css';

Modal.setAppElement('#root');

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // Update state based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    closeLogoutModal();
    navigate("/login"); // Redirect to login page on logout
  };

  const openLogoutModal = () => {
    setModalIsOpen(true);
  };

  const closeLogoutModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="navbar">
      <img src="/icon.svg" alt="Logo" className="icon" />
      {isLoggedIn ? (
        <button onClick={openLogoutModal} className="logout-button">Logout</button>
      ) : (
        <Link to="/login" className="text-decor">Log In</Link>
      )}
      
      {/* Modal for logout confirmation */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeLogoutModal}
        contentLabel="Logout Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="fixed m-24 inset-0 flex items-start justify-center">
          <div className="bg-black bg-opacity-75 rounded-lg p-6">
            <h2 className="text-lg text-white font-semibold">Logout Confirmation</h2>
            <p className="mt-4 text-white">Are you sure you want to log out?</p>
            <div className="flex justify-center mt-4">
            <button
                className="confirm-button"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="cancel-button"
                onClick={closeLogoutModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
