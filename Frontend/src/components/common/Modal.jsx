import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
        <div className="modal-header flex justify-between items-center mb-4">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          <Button onClick={onClose} variant="secondary">
            ✕
          </Button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
