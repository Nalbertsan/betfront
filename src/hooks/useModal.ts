import { useState } from 'react'

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
  {showModal, handleOk, handleCancel , isModalOpen, setIsModalOpen}
  )
}
