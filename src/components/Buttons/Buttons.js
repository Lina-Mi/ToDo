import styles from './Buttons.module.css';

export const Button = ({ children, onClick, disabled = false, className = '' }) => {
	return (
		<button className={styles.button} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};
