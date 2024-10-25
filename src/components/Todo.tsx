import { TodoId, type Todo as TodoType } from '../types'

// type Props = TodoType
interface Props extends TodoType {
	onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void,
	onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted }) => {
	return (
		<div className="view">
			<input
				type="checkbox"
				className="toggle"
				checked={completed}
				onChange={(event) => { onToggleCompleted({ id, completed: event.target.checked }) }} />
			<label htmlFor={`todo-${id}`}>{title}</label>
			<button
				className="destroy"
				onClick={() => onRemoveTodo({ id })} />
		</div>
	)
}