import React, { useRef } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { reactChildren } from '../../types/general.types';
import "./modal-wrapper.css"
const ModalWrapper = ({children}:reactChildren) =>{
  const {isModalVisible,hideModal} = useModal();
  const modalRef = useRef<any>();

  const closeModal = (e:any) => {
    if(modalRef.current === e.target){
      hideModal();
    }
  }

  return true ? (
    <div className="modal-background" ref={modalRef} onClick={closeModal}>
      {children}
      <button className="modal-close-button" onClick={()=>hideModal()}>X</button>
    </div>
  ):null
}

export default ModalWrapper;