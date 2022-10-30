import styles from "./Todo.module.css"
import { useEffect, useRef, useState } from 'react';
import CrudContext from "../../common/Crud/CrudContext";



export default function Todo({ user }: { user: User }) {

    const [tasks, setTasks] = useState(user.todos);
    const [task, setTask] = useState({ task: "" } as Todo);
    const [shouldRender, setShouldRender] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
        input.value === ""
            ? setTask({ task: "" } as Todo)
            : setTask((prev) => ({ ...prev, task: input.value }));
    };

    const editRef = useRef()
    const newRef = useRef(null)
    const deleteRef = useRef([])
    const updateRef = useRef([])

    useEffect(() => {
        setShouldRender(false)
    }, [shouldRender])



    return (
        <>

            <CrudContext<Todo>
                baseURL="/api/todo"
                setData={setTasks}
                editRef={editRef}
                newRef={newRef}
                deleteRef={deleteRef}
                updateRef={updateRef}
            >


                <main className={styles.main}>
                    <h1 className={styles.heading}>TO-DO</h1>
                    <div className={styles.container}>
                        <form ref={!task.id ? newRef : editRef} className={styles.form_container} data-id={task.id ? task.id : null}>
                            <input
                                className={styles.input}
                                type="text"
                                name="task"
                                placeholder="Task to be done..."
                                onChange={handleChange}
                                value={task.task}
                            />
                            <button type="submit" className={styles.submit_btn} onClick={() => setTimeout(() => setTask({ task: "" } as Todo), 10)}>
                                {task.id ? "Update" : "Add"}
                            </button>
                        </form>
                        {tasks.map((todo, i) => (
                            <div className={styles.task_container} key={i}>
                                <input
                                    type="checkbox"
                                    className={styles.check_box}
                                    defaultChecked={todo.completed}
                                    data-id={todo.id}
                                    ref={el => updateRef.current[i] = el}
                                />
                                <p
                                    className={
                                        todo.completed
                                            ? styles.task_text + " " + styles.line_through
                                            : styles.task_text
                                    }
                                >
                                    {todo.task}
                                </p>
                                <button
                                    onClick={() => {
                                        setTask((t) => t.id ? { task: "" } as Todo : todo)
                                        setShouldRender(true)
                                    }
                                    }
                                    className={styles.edit_task}
                                >
                                    &#9998;
                                </button>
                                <button
                                    ref={el => deleteRef.current[i] = el}
                                    data-id={todo.id}
                                    className={styles.remove_task}
                                >
                                    &#10006;
                                </button>
                            </div>
                        ))}
                        {tasks.length === 0 && <h2 className={styles.no_tasks}>No tasks</h2>}
                    </div>
                </main>


            </CrudContext>

        </>
    )
}

