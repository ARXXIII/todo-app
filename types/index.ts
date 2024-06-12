import { MouseEventHandler } from 'react';

export interface TaskProps {
	id: number;
	task: string;
	status: 'uncompleted' | 'completed';
	complete: (id: number) => void;
	remove: (id: number) => void;
	display: boolean;
}
