import { createContext, useContext, useState } from "react";
import { reactChildren } from "../../types/general.types";

const ModalContext = createContext({} as any)

const ModalProvider = ({children}:reactChildren) => {

  const [isModalVisible,setIsModalVisible] = useState<boolean>(false);

  const hideModal = () => {
    setIsModalVisible(false);
  }

  const showModal = () => {
    setIsModalVisible(true);
  }

  return (
    <ModalContext.Provider value={{isModalVisible,showModal,hideModal}}>
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export {ModalProvider,useModal}