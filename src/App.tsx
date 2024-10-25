import { useState } from "react"
import { Todos } from "./components/Todos"
import { type TodoId, Todo as TodoType, FilterValue, TodoTitle } from './types'
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"


const mockTodos = [
	{ id: 1, title: 'Aprender typescript', completed: true },
	{ id: 2, title: 'Hacer otro proyecto con typescript', completed: false },
	{ id: 3, title: 'Hacer proyecto con ReactNative', completed: false },
]

const App = () => {
	const [todos, setTodos] = useState(mockTodos)
	const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

	const handleRemoveAllCompleted = (): void => {
		const newTodos = todos.filter(todo => !todo.completed)
		setTodos(newTodos)
	}

	const handleRemove = ({ id }: TodoId) => {
		const newTodos = todos.filter(todo => todo.id !== id)
		setTodos(newTodos)
	}

	const handleComplete = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
		const newTodos = todos.map(todo => {
			if (todo.id === id) {
				return { ...todo, completed }
			}
			return todo
		})
		setTodos(newTodos)
	}

	const handleFilterChange = (filter: FilterValue): void => {
		setFilterSelected(filter)
	}

	const activeCount = todos.filter(todo => !todo.completed).length
	const completedCount = todos.length - activeCount
	const filteredTodos = todos.filter(todo => {
		if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
		if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
		return todo
	})

	const handleAddTodo = ({ title }: TodoTitle): void => {
		const newTodo = {
			title,
			id: todos.length + 1,
			completed: false
		}
		const newTodos = [...todos, newTodo]
		setTodos(newTodos)
	}

	return (
		<div className="todoapp">
			<Header onAddTodo={handleAddTodo} />
			<Todos
				onToggleCompleted={handleComplete}
				onRemoveTodo={handleRemove}
				todos={filteredTodos}
			/>
			<Footer
				activeCount={activeCount}
				completedCount={completedCount}
				filterSelected={filterSelected}
				onClearComplete={handleRemoveAllCompleted}
				handleFilterChange={handleFilterChange}
			/>
		</div>
	)
}

export default App
