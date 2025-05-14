import ReactDOM from 'react-dom';
import styles from './notice.module.scss';

interface NoticeProps {
	text: string;
	type?: 'error';
}

function Notice({ text, type }: NoticeProps) {
	return ReactDOM.createPortal(
		<div className={`${styles.notice} ${type === 'error' ? styles.error : ''}`}>
			<p className={`${styles.text} text text_type_main-default`}>{text}</p>
		</div>,
		document.getElementById('notices') as HTMLElement
	);
}


export default Notice;