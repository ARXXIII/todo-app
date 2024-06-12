'use client'

import Confetti from "react-confetti";
import { Task } from "@/components/task";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";
import { ErrorModal } from "@/components/modals/error";

interface Provider {
    id: number,
    name: string,
    status: 'uncompleted' | 'completed',
    display: boolean,
}

export default function Home() {
    const { width, height } = useWindowSize()

    const [value, setValue] = useState<string>('')
    const [confetti, setConfetti] = useState<boolean>(false)
    const [modalError, setModalError] = useState<boolean>(false)
    const [todoList, setTodoList] = useState<Array<Provider>>([])
    const [message, setMessage] = useState<string>('Так пусто, что эхо слышно')
    const [lastFilterOption, setFilterOption] = useState<'all' | 'uncompleted' | 'completed'>('all')

    const saveTasks = (tasks: object[]) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const getTasks = () => {
        const data = JSON.parse(localStorage.getItem('tasks') || '{}');

        setTodoList(data)
    }

    const createTask = (id: number, value: string) => {

        const task: Provider = {
            id: id,
            name: value,
            status: 'uncompleted',
            display: true,
        }

        todoList.push(task)
    }

    const handleOnClick = () => {
        let id

        if (todoList.length > 0) {
            id = todoList[todoList.length - 1].id + 1
        } else {
            id = 1
        }

        if (value != '') {
            createTask(id, value)
            saveTasks(todoList)
            getTasks()
            filterTasks(lastFilterOption)

            setValue('')
        } else {
            setTimeout(() => {
                setModalError(false)
            }, 1300, setModalError(true));
        }
    }

    const onEnter = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleOnClick()
        }
    }

    const completeTask = (id: number) => {

        todoList.forEach((task) => {

            if (task.id === id) {
                task.status = 'completed'

                filterTasks(lastFilterOption)

                setTimeout(() => {
                    setConfetti(false)
                }, 3000, setConfetti(true));
            }
        })

        saveTasks(todoList)
        getTasks()
    }

    const removeTask = (id: number) => {

        todoList.forEach((task) => {

            if (task.id === id) {
                todoList.splice(todoList.indexOf(task), 1)
            }
        })

        saveTasks(todoList)
        getTasks()
    }

    const filterTasks = (option: 'all' | 'uncompleted' | 'completed') => {

        if (option === 'all') {

            todoList.forEach((task) => {
                task.display = true
            })

            setMessage('Так пусто, что эхо слышно')
        }

        if (option === 'uncompleted') {

            todoList.forEach((task) => {
                task.display = true

                if (task.status !== option) {
                    task.display = false
                }
            })

            setMessage('Бездельничаем получается')
        }

        if (option === 'completed') {

            let i = 0

            todoList.forEach((task) => {
                task.display = true

                if (task.status !== option) {
                    task.display = false
                    i++
                }
            })

            setMessage('Почему ничего не выполнено, а?')
        }

        setFilterOption(option)

        saveTasks(todoList)
        getTasks()
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            {confetti ? (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
            ) : null}

            {modalError ? (<ErrorModal />) : null}

            <article className="flex justify-center">
                <section className="flex flex-col justify-center items-center gap-y-6 lg:gap-y-12 w-full lg:max-w-fit">
                    <div className="flex flex-col lg:flex-row items-center gap-y-3 lg:gap-x-6 text-xl lg:text-2xl w-full">

                        <input
                            type="text"
                            placeholder="Делаем что или отдыхаем?"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => onEnter(e)}
                            className="w-full lg:min-w-[500px] p-3 lg:p-6 border-2 border-gray-200 bg-neutral-100 rounded-xl shadow"
                        />

                        <button
                            type="button"
                            onClick={handleOnClick}
                            className="p-3 lg:p-6 w-full lg:w-fit font-bold border-2 border-gray-200 bg-gradient-to-r from-black to-purple-500 text-transparent bg-clip-text rounded-xl active:scale-[0.96] duration-200 ease-in shadow">
                            Добавить
                        </button>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-3 lg:gap-x-6 w-full font-bold text-xl lg:text-2xl">

                        <button
                            type="button"
                            onClick={(e) => filterTasks('all')}
                            className="p-3 lg:p-6 border-2 border-gray-200 bg-gradient-to-r from-black to-rose-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
                        >
                            Все
                        </button>

                        <button
                            type="button"
                            onClick={(e) => filterTasks('uncompleted')}
                            className="p-3 lg:p-6 border-2 border-gray-200 bg-gradient-to-r from-black to-cyan-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
                        >
                            Активные
                        </button>

                        <button
                            type="button"
                            onClick={(e) => filterTasks('completed')}
                            className="p-3 lg:p-6 border-2 border-gray-200 bg-gradient-to-r from-black to-green-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
                        >
                            Выполненные
                        </button>

                    </div>

                    {todoList.length > 0
                        ? (<section className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 lg:gap-6 w-full">

                            {todoList.map((task, index) => (
                                <Task
                                    key={index}
                                    id={task.id}
                                    task={task.name}
                                    status={task.status}
                                    complete={completeTask}
                                    remove={removeTask}
                                    display={task.display}
                                />
                            ))}

                        </section>)
                        : (<div
                            className="p-3 lg:p-6 w-full text-center font-bold text-xl lg:text-2xl border-2 border-gray-200 bg-gradient-to-r from-purple-500 via-rose-500 to-yellow-500 text-transparent bg-clip-text rounded-xl shadow"
                        >
                            {message}
                        </div>)
                    }
                </section>
            </article >
        </>
    );
}