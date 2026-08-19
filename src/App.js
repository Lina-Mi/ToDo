import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.css';

import { MainPage } from './pages/MainPage';
import { TaskPage } from './pages/TaskPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
	return (
		<div className={styles.App}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/task/:id" element={<TaskPage />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" replace={true} />} />
			</Routes>
		</div>
	);
};
