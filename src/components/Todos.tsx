import { type Todo as TodoType, TodoId, type ListOfTodos } from '../types'
import { Todo } from './Todo'

interface Props {
	todos: ListOfTodos,
	onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void,
	onRemoveTodo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted }) => {
	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
					<Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} onRemoveTodo={onRemoveTodo} onToggleCompleted={onToggleCompleted} />
				</li>
			))}
		</ul>
	)
}