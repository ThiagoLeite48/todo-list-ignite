import style from '../Task/Task.module.css';
import ClipBoard from '../../assets/Clipboard.svg';
import { ITasks } from '../ListTask/ListTask';
import { Trash } from 'phosphor-react';




interface Props {
    tasks: ITasks[];
    checkIscompleted: (tasksId: string) => void;
    deleteTask: (tasksId: string) => void;
}


export function Task({ tasks, checkIscompleted, deleteTask }: Props) {



    const countTask = tasks.length;

    const isCompleteTask = tasks.filter(tasks => {
        return tasks.isComplete != false;


    })

    function handleChecked(tasksId: string) {

        return checkIscompleted(tasksId);

    }

    function handleDelete(taskId: string) {

        return deleteTask(taskId);
    }








    return (


        <div>

            <div className={style.boxTasks}>
                <article >

                    <header>
                        <ul>Tarefas criadas <span>{countTask}</span> </ul>
                        <ul> Concluidas <span>{isCompleteTask.length === 0 ? isCompleteTask.length : ` ${isCompleteTask.length} de ${countTask}`}</span> </ul>

                    </header>



                    <main>



                        <div className={style.list}>
                            {tasks.map((tasks) => (


                                <ul className={style.task} key={tasks.id}>


                                    <input type="checkbox" checked={tasks.isComplete}
                                        onChange={() => handleChecked(tasks.id)}></input>
                                    <li className={tasks.isComplete ? style.taskCkecked : style.taskCkeckednot} >{tasks.title}</li>
                                    <button onClick={() => handleDelete(tasks.id)}><Trash size={20} /></button>

                                </ul>

                            ))

                            }

                        </div>

                        {tasks.length <= 0 && (
                            <section>
                                <img src={ClipBoard} alt="" />
                                <strong>Você ainda não tem tarefas cadastradas</strong>
                                <p>Crie tarefas e organize seus itens a fazer</p>
                            </section>
                        )}




                    </main>









                </article>

            </div>

        </div>
    )
}


