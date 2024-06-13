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
    const [todoList, setTodoList] = useState<Array<Provider>>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [message, setMessage] = useState<string>('So emptyyy... ptyyy... yyy...')
    const [lastFilterOption, setFilterOption] = useState<'all' | 'uncompleted' | 'completed'>('all')

    const saveTasks = (tasks: object[]) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const getTasks = () => {
        const data = JSON.parse(localStorage.getItem('tasks') || '[]');

        setTodoList(data)
    }

    const createTask = (id: number, value: string) => {

        const data = todoList

        const task: Provider = {
            id: id,
            name: value,
            status: 'uncompleted',
            display: true,
        }

        try {
            data.push(task)

            saveTasks(data)
            getTasks()
            filterTasks(lastFilterOption)
        } catch (error) {
            setTimeout(() => {
                setErrorMessage('')
            }, 1300, setErrorMessage('Something went wrong'));
        }
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

            setValue('')
        } else {
            setTimeout(() => {
                setErrorMessage('')
            }, 1300, setErrorMessage('The task wants a name!'));
        }
    }

    const onEnter = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleOnClick()
        }
    }

    const completeTask = (id: number) => {

        const data = todoList

        try {
            data.forEach((task) => {

                if (task.id === id) {
                    task.status = 'completed'

                    filterTasks(lastFilterOption)

                    setTimeout(() => {
                        setConfetti(false)
                    }, 3000, setConfetti(true));
                }
            })

            saveTasks(data)
            getTasks()

        } catch (error) {
            setTimeout(() => {
                setErrorMessage('')
            }, 1300, setErrorMessage('Something went wrong'));
        }
    }

    const removeTask = (id: number) => {

        const data = todoList

        try {
            data.forEach((task) => {

                if (task.id === id) {
                    data.splice(data.indexOf(task), 1)
                }
            })

            saveTasks(data)
            getTasks()

        } catch (error) {
            setTimeout(() => {
                setErrorMessage('')
            }, 1300, setErrorMessage('Something went wrong'));
        }
    }

    const filterTasks = (option: 'all' | 'uncompleted' | 'completed') => {

        const data = todoList

        if (option === 'all') {

            try {
                data.forEach((task) => {
                    task.display = true
                })

                setMessage('So emptyyy... ptyyy... yyy...')
            } catch (error) {

                setTimeout(() => {
                    setErrorMessage('')
                }, 1300, setErrorMessage('Something went wrong'));
            }
        }

        if (option === 'uncompleted') {

            try {
                data.forEach((task) => {
                    task.display = true

                    if (task.status !== option) {
                        task.display = false
                    }
                })

                setMessage(`It turns out we're messing around`)
            } catch (error) {

                setTimeout(() => {
                    setErrorMessage('')
                }, 1300, setErrorMessage('Something went wrong'));
            }
        }

        if (option === 'completed') {

            let i = 0

            try {
                data.forEach((task) => {
                    task.display = true

                    if (task.status !== option) {
                        task.display = false
                        i++
                    }
                })

                setMessage(`Why hasn't anything been done, huh?`)
            } catch (error) {

                setTimeout(() => {
                    setErrorMessage('')
                }, 1300, setErrorMessage('Something went wrong'));
            }
        }

        setFilterOption(option)

        saveTasks(data)
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

            {errorMessage ? (<ErrorModal title={errorMessage} />) : null}

            <article className="flex justify-center">
                <section className="flex flex-col justify-center items-center gap-y-6 lg:gap-y-12 w-full lg:max-w-fit">
                    <div className="flex flex-col lg:flex-row items-center gap-y-3 lg:gap-x-6 text-xl lg:text-2xl w-full">

                        <input
                            type="text"
                            placeholder="Do we do something or chill?"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => onEnter(e)}
                            className="w-full lg:min-w-[500px] p-3 lg:p-6 border-2 border-gray-200 bg-neutral-100 rounded-xl shadow"
                        />

                        <button
                            type="button"
                            onClick={handleOnClick}
                            className="p-3 lg:p-6 w-full lg:w-fit font-bold border-2 border-gray-200 bg-gradient-to-r from-black to-purple-500 text-transparent bg-clip-text rounded-xl active:scale-[0.96] duration-200 ease-in shadow"
                        >
                            Add
                        </button>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-3 lg:gap-x-6 w-full font-bold text-xl lg:text-2xl">

                        <button
                            type="button"
                            onClick={(e) => filterTasks('all')}
                            className="p-3 lg:p-6 border-2 border-gray-200 bg-gradient-to-r from-black to-rose-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
                        >
                            All
                        </button>

                        <button
                            type="button"
                            onClick={(e) => filterTasks('uncompleted')}
                            className="p-3 lg:p-6 border-2 border-gray-200 bg-gradient-to-r from-black to-cyan-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
                        >
                            Active
                        </button>

                        <button
                            type="button"
                            onClick={(e) => filterTasks('completed')}
                            className="p-3 lg:p-6 border-2 border-gray-200 bg-gradient-to-r from-black to-green-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
                        >
                            Completed
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