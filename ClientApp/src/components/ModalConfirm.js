import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

const ModalConfirm = ({children,isOpen,setIsOpen,title,actionConfirm}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={setIsOpen}>
        <ModalHeader toggle={setIsOpen}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="secundary" onClick={setIsOpen}>
           Cancelar
          </Button>{" "}
          <Button color="primary" onClick={actionConfirm}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalConfirm;