import styles from '../App.module.css';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.App}>
			<div className={styles.headerRow}>
				<h1 className={styles.title}>To Do List</h1>
			</div>

			<h1 className={styles.notFoundHeader}>404</h1>

			<div className={styles.notFoundContainer}>
				<div className={styles.todoTitle}>Page Not Found</div>

				<button className={styles.notFoundButton} onClick={() => navigate('/')}>
					Go to the Main Page
				</button>
			</div>
		</div>
	);
};
