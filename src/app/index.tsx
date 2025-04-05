import { DndProvider } from 'react-dnd';
import s from './app.module.scss';
import { AppHeader } from '@components/app-header/app-header';
import MainConstructor from '@components/main-constructor/mainConstructor';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	return (
		<div className={s.page}>
			<DndProvider backend={HTML5Backend}>
				<AppHeader />
				<MainConstructor />
			</DndProvider>
		</div>
	);
};
