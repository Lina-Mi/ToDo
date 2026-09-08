import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { useTodos } from './hooks/useTodos';

import { MainPage } from './pages/MainPage';
import { TaskPage } from './pages/TaskPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
	const todoData = useTodos();
	return (
		<div className={styles.App}>
			<Routes>
				<Route path="/" element={<MainPage {...todoData} />} />
				<Route path="/task/:id" element={<TaskPage {...todoData} />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" replace={true} />} />
			</Routes>
		</div>
	);
};
