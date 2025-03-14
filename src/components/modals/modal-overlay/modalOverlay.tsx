import modalOverlay from './modalOverlay.module.scss';

const ModalOverlay = ({ close }: any) => {
	return <div onClick={close} className={modalOverlay.inner}></div>;
};

export default ModalOverlay;
