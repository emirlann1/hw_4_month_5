import { addTodo, deleteTodo, fetchTodos } from '../store/todoReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import '../App.css'


export default function TodoList () {
    const [ newTodo, setNewTodo ] = useState('')
    const todos = useSelector(state => state.todos.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    const inputTodo = (e) => {
        setNewTodo(e.target.value)
    }

    const sendForm = () => {
        if (newTodo.trim() !== ''){
            dispatch(addTodo(newTodo))
            setNewTodo('')
        }
    }

    const clickDeleteTodo = (todo) => {
        dispatch(deleteTodo(todo))
    }

    return (
        <div className={'wrapper'}>
            <h2>TodoList</h2>
            <input type="text" onChange={inputTodo} value={newTodo} placeholder={'Add new Todo...'}/>
            <button className={'btn'} onClick={sendForm}>Добавить</button>

            <div>
                {todos && <ul>{todos.map(t =>
                    <li key={t.id} onClick={() => clickDeleteTodo(t)}>
                        {t.title}
                    </li>)}
                </ul>}
            </div>
        </div>
    )
}