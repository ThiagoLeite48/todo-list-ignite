import style from './ListTask.module.css';
import { PlusCircle } from "phosphor-react";
import { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../Task/Task';


const LOCAL_STORAGE_TASK = "localStorage";

export interface ITasks {
    id: string;
    title: string;
    isComplete: boolean;
}

export function ListTask() {

    function saveTask(newTasks: ITasks[]) {

        setTasks(newTasks);

        localStorage.setItem(LOCAL_STORAGE_TASK, JSON.stringify(newTasks))

    }

    function loadStorage() {
        const save = localStorage.getItem(LOCAL_STORAGE_TASK);
        if (save) {
            setTasks(JSON.parse(save))
        }
    }


    useEffect(() => {
        loadStorage();

    }, []);




    const [tasks, setTasks] = useState<ITasks[]>([]);

    const [newTasks, setNewTasks] = useState('');




    const addTask = (event: FormEvent) => {

        event.preventDefault();


        saveTask([...tasks,
        {
            id: uuidv4(),
            title: newTasks,
            isComplete: false,
        }])



        setNewTasks("");


    }

    const checkIscompleted = (tasksId: string) => {


        const newTasks = tasks.map((task) => {
            if (task.id == tasksId) {

                return {
                    ...task,
                    isComplete: !task.isComplete,
                }

            }
            return task;
        })

        saveTask(newTasks)
    }

    const deleteTask = (tasksId: string) => {

        const newTasks = tasks.filter((task) => task.id != tasksId)

        saveTask(newTasks);
    }








    return (
        <div>

            <div className={style.boxNewTask}>


                <form onSubmit={addTask}>
                    <input
                        required
                        type="text"
                        placeholder='Adicione uma Tarefa'
                        className={style.input}
                        value={newTasks}
                        onChange={e => setNewTasks(e.target.value)}
                    />


                    <button type="submit"

                        className={style.button} >
                        Criar

                        <PlusCircle size={18} />

                    </button>
                </form>



            </div>

            <Task tasks={tasks} checkIscompleted={checkIscompleted} deleteTask={deleteTask} />


        </div>


    )

}