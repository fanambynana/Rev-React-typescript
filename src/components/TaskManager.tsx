import { nanoid } from "nanoid";
import { useState } from "react";
import "./TaskManager.css";

// TODO: create custom hook to manage task state
export const TaskManager = () => {
    interface Task {
        id: string;
        title: string;
    }
    interface TaskUpdate {
        title: string;
    }

    const [title, setTitle] = useState<string>("");
    const [searchKeyword, setSearchKeyword] = useState<String>("");
    const [tasks, setTasks] = useState<Array<Task>>([]);

    // remove task from list
    const completeTask = (id: string) => {
        setTasks(tasks.filter((task: Task) => task.id !== id));
    };

    const updateTask = (id: string, taskUpdate: TaskUpdate) => {
        const newTasks: Array<Task> = tasks.slice();

        const index: number = tasks.findIndex((task: Task) => task.id === id);

        newTasks[index] = {
            "id": id,
            "title": taskUpdate.title
        };

        setTasks(newTasks);
    };

    const addTask = () => {
        if (title.length < 1) {
            return;
        }

        const newTask: Task = {
            // using nanoid to generate unique id
            id: nanoid(),
            title,
        };
        setTasks((prev: Array<Task>) => prev.concat(newTask));
        setTitle("");
    };

    const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(ev.target.value);
    };

    const filteredTasks = tasks.filter((task: Task) =>
        task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    return (
        <div className="container">
            <h1>Task Manager</h1>

            <div>
                <input type="text" onChange={handleSearch} placeholder="Search Task" />
            </div>

            <div className="task">
                <input
                    type="text"
                    value={title}
                    onChange={(ev) => {
                        setTitle(ev.target.value);
                    }}
                />

                <button onClick={addTask}>Add Task</button>
            </div>

            <ul className="container">
                {filteredTasks.map((task: Task) => (
                    <li key={task.id} className="task">
                        <div className="task">
                            <input
                                type="text"
                                placeholder="Add new task"
                                value={task.title}
                                onChange={(e) => updateTask(task.id, { title: e.target.value })}
                            />
                            <button onClick={() => completeTask(task.id)}>Done</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
