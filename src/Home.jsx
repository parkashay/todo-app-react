import React, { useEffect, useState } from 'react'


let effectFires = 2;   // useeffect is fired twice i don't know why. please help me lol

if (!(localStorage.todos && localStorage.completed)) {   //if items not available, 
    localStorage.setItem('todos', JSON.stringify([]));  // this creates empty value for todos
    localStorage.setItem('completed', JSON.stringify([])); // this create empty value for completed todos
}

function Home() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.todos))
    const [newTodo, setNewTodo] = useState("");
    const [completed, setCompleted] = useState(JSON.parse(localStorage.completed));
    var [count, setCount] = useState(todos.length);


    useEffect(() => {
        if (effectFires !== 0) {
            effectFires = effectFires - 1;   // useEffect is fired twice om first render because of the map functions.
            return;                         // this if block prevents from firing the useEffect at initial render.
        }
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('completed', JSON.stringify(completed));
    }, [todos, completed])

    function handleInput(e) {       // handling input in the input field
        setNewTodo(e.target.value);
    }

    const handleAdd = () => {   //adding new todo
        if (newTodo !== '') {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i] === newTodo) {     //cannot add duplicate todos
                    setNewTodo('');
                    alert('Todo already exists');
                    return;
                }
            }
            setTodos([...todos, newTodo]);
            setNewTodo('');
            setCount(count + 1);
        }
        else alert("cannot add empty todo !!");
    }




    const handleComplete = (todo) => {    //moving todos to the completed section
        setTodos(todos.filter(newlist => newlist !== todo))
        setCompleted([...completed, todo]);
        setCount(count - 1)
    }

    function handleDelete(deletable) {   // deleting completed todos
        setCompleted(completed.filter(newcomplete => newcomplete !== deletable))
        localStorage.removeItem(completed.deletable)
    }

    return (

        <div className='home container'>
            <div className='counter' >
                You have {count} todos.
            </div>

            <div className='inputgroup'>
                <input type="text" className='form-control mx-3 bg-dark text-white' value={newTodo} onChange={handleInput} />
                <button type='button' className='btn btn-light addButton' onClick={() => handleAdd()}>ADD</button>
            </div>

            {todos.length > 0 ?
                <div className="todos">
                    <div className='fs-2 text-center mb-3'><b>Todos:</b><hr /></div>
                    {todos.map(todo => {
                        return (
                            <div className="list-group-item" key={todo} >
                                <span>{todo}</span>
                                <button className='btn btn-light deleteButton' onClick={() => handleComplete(todo)}>
                                    completed
                                </button>

                            </div>
                        )
                    })}

                </div>
                : <div className='emptyTodo fs-1'>
                    Add new Todo
                </div>
            }

            {completed.length > 0 ?
                <>
                    <div className='divider'></div>
                    <div className="todos">
                        <div className='mb-3 fs-2 text-center'> <b> Completed: </b> <hr /></div>
                        {completed.map(deletable => {
                            return (
                                <div className="list-group-item" key={deletable}>
                                    <span>{deletable}</span>
                                    <button className='btn btn-light deleteButton' onClick={() => handleDelete(deletable)}>
                                        delete
                                    </button>
                                </div>
                            )
                        })}

                    </div>
                </>
                : ""
            }


        </div>
    )
}

export default Home