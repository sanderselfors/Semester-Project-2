import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateListingForm from '../CreateListingForm';

const FormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the body based on modal visibility
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Open the modal using state */}
      <button className="btn" onClick={openModal}>
        Create listing
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-auto"
          >
            <div
              className="fixed top-0 left-0 w-full h-full bg-opacity-20 backdrop-blur-md"
              onClick={closeModal}
            ></div>
            <div className="modal-container">
              <motion.div
                initial={{ opacity: 0, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, x: '-50%', y: '-50%' }}
                className="absolute w-full max-w-xl p-6 overflow-auto transform -translate-x-1/2 -translate-y-1/2 rounded-md top-1/2 left-1/2"
                style={{ maxHeight: '80vh' }}
              >
                {/* Render the CreateListingForm component inside the modal */}
                <CreateListingForm onSuccess={closeModal} />
                {/* Buttons aligned to the right */}
                <div className="flex justify-end mt-4">
                  <button className="mr-2 btn" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormModal;
