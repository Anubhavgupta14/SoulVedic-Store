import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Set the root element for ReactModal to manage accessibility
ReactModal.setAppElement("body");

const Modal = ({
  children,
  closeModal,
  isOpen,
  className = "web-view-modal",
  ...props
}) => (
  <ReactModal
    {...props}
    isOpen={isOpen}
    overlayClassName="no-scroll"
    bodyOpenClassName="no-scroll"
    onRequestClose={closeModal}
    className={className}
    shouldFocusAfterRender={false}
  >
    <div className="close-modal" onClick={closeModal}>
      {/* <i className="st-icon-close" /> */}
      <span>❌</span>
    </div>
    {children}
  </ReactModal>
);

// Define prop types for the component
Modal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
