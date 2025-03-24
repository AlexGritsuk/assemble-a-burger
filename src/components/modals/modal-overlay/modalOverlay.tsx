import modalOverlay from './modalOverlay.module.scss';

interface CloseProps {
	close?: () => void
}

const ModalOverlay = ({ close }: CloseProps) => {
	return <div onClick={close} className={modalOverlay.inner}></div>;
};

export default ModalOverlay; 
