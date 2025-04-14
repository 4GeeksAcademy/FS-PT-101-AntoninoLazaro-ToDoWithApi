import React, { useEffect, useState } from "react";


export const TodoList = () => {

    const [task, setTask] = useState('')
    const [data, setData] = useState([])

    const createUser = async () => {
        try {
            // POST
            const response = await fetch('https://playground.4geeks.com/todo/users/abrara', {
                method: "POST", // método que se va a utilizar, siempre en mayúsculas
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error status code: ${response.status}`);
            }
    
            const data = await response.json();
            getUserTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const getUserTodos = async () => {
        try {
            // GET
            const response = await fetch('https://playground.4geeks.com/todo/users/abrara');
    
            console.log(response);
    
            if (!response.ok) {
                throw new Error(`Error code: ${response.status}`);
            }
    
            const parsedJson = await response.json();
            setData(parsedJson);
        } catch (error) {
            console.log(error);
            createUser(); // En caso de error, llama a createUser
        }
    };

    const createTask = async () => {
        try {
            // POST
            const response = await fetch('https://playground.4geeks.com/todo/todos/abrara', {
                method: "POST", // método que se va a utilizar, siempre en mayúsculas
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ label: task, is_done: false })
            });
    
            if (!response.ok) {
                throw new Error(`Error status code: ${response.status}`);
            }
    
            const data = await response.json();
            getUserTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // DELETE
            const response = await fetch('https://playground.4geeks.com/todo/todos/' + id, {
                method: "DELETE" // método que se va a utilizar, siempre en mayúsculas
            });
    
            if (!response.ok) {
                throw new Error(`Error status code: ${response.status}`);
            }
    
            getUserTodos(); // Llama a getUserTodos después de una solicitud exitosa
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        getUserTodos()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        createTask()
        setTask('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className="m-4"type="text" value={task} onChange={e => setTask(e.target.value)} />
                <input type="submit" hidden />
            </form>

            <div>
                <ul className="d-flex flex-column align-items-center">
                    {data.todos?.map((el, i) => <li key={i} className="m-2 d-flex justify-content-center align-items-center bg-light rounded border col-lg-10"><p className="m-0 d-flex mx-2 align-items-center">{el.label}</p><span className="btn text-danger fw-bold" onClick={()=>handleDelete(el.id)}>X</span> </li>)}
                </ul>
            </div>
        </div>
    )
}