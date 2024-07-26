// src/components/LogoutModal.jsx

import React from 'react';
import Modal from 'react-modal';


function LogoutModal({ isOpen, onClose }) {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login page on logout
      };
    
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="Modal" overlayClassName="Overlay">
            <div className="fixed m-24 inset-0 flex items-start justify-center">
                <div className="bg-black bg-opacity-75 rounded-lg p-6">
                    <h2 className="text-lg text-white font-semibold">Logout Confirmation</h2>
                    <p className="mt-4 text-white">Are you sure you want to log out?</p>
                    <div className="flex justify-center mt-4">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-950"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-black"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default LogoutModal;
