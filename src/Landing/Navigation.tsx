import React, { useState } from 'react';
import ModalComponent from './../component/Modal';
import ButtonComponent from './../component/Button';

const Nav: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <ButtonComponent onClick={showModal} />
      <ModalComponent isVisible={isModalVisible} onClose={closeModal} />
    </>
  );
};

export default Nav;
