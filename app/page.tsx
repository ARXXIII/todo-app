'use client'

import Confetti from "react-confetti";
import { Task } from "@/components/task";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";
import { ErrorModal } from "@/components/modals/error";

interface Provider {
  task: string,
  status: "uncompleted" | "completed",
}

export default function Home() {
  const { width, height } = useWindowSize()

  const [value, setValue] = useState('')
  const [todoList, setTodoList] = useState<Array<Provider>>([])
  const [confetti, setConfetti] = useState(false)
  const [modalError, setModalError] = useState(false)

  const getTasks = (option: 'all' | 'uncompleted' | 'completed') => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '{}');

    if (option === 'all') {
      setTodoList(tasks)
    }

    if (option === 'uncompleted') {
      const uncompletedList: Provider[] = []

      tasks.forEach((element: Provider) => {
        if (element.status === option) uncompletedList.push(element)
      });

      setTodoList(uncompletedList)
    }

    if (option === 'completed') {
      const completedList: Provider[] = []

      tasks.forEach((element: Provider) => {
        if (element.status === option) completedList.push(element)
      });

      setTodoList(completedList)
    }
  }

  const completeTask = (id: any) => {
    todoList[id].status = 'completed'

    setConfetti(true)

    setTimeout(() => {
      setConfetti(false)
    }, 3000)

    saveTasks(todoList)
    getTasks('all')
  }

  const removeTask = (id: any) => {
    todoList.splice(id, 1)

    saveTasks(todoList)
    getTasks('all')
  }

  const addTask = () => {
    const tasks: object[] = []
    const taskName = value

    if (taskName != '') {

      const task = {
        task: taskName,
        status: 'uncompleted'
      }

      for (let i = 0; i < todoList.length; i++) {
        tasks.push(todoList[i])
      }

      tasks.push(task);

      saveTasks(tasks)
      getTasks('all')

      setValue('')

    } else {
      setModalError(true)

      setTimeout(() => {
        setModalError(false)
      }, 1250)
    }
  }

  const saveTasks = (tasks: object[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  useEffect(() => {
    getTasks('all')
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
        <section className="flex flex-col justify-center items-center gap-y-6 lg:gap-y-12 lg:max-w-fit">
          <div className="flex flex-col lg:flex-row items-center gap-y-6 lg:gap-x-12 text-xl lg:text-2xl w-full">

            <input
              type="text"
              placeholder="Делаем что или ну его?"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full lg:min-w-[500px] p-3 lg:p-6 border-2 border-gray-200 bg-neutral-100 rounded-xl shadow"
            />

            <button
              type="button"
              onClick={addTask}
              className="p-3 lg:p-6 w-full lg:w-fit font-bold border-2 border-gray-200 bg-gradient-to-r from-black to-purple-500 text-transparent bg-clip-text rounded-xl active:scale-[0.96] duration-200 ease-in shadow">
              Добавить
            </button>

          </div>

          <div className="flex justify-between items-center gap-x-6 lg:gap-x-12 w-full font-bold text-xl lg:text-2xl">

            <button
              type="button"
              onClick={(e) => getTasks('all')}
              className="p-3 lg:p-6 w-full border-2 border-gray-200 bg-gradient-to-r from-black to-rose-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
            >
              Все
            </button>

            <button
              type="button"
              onClick={(e) => getTasks('uncompleted')}
              className="p-3 lg:p-6 w-full border-2 border-gray-200 bg-gradient-to-r from-black to-cyan-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
            >
              Активные
            </button>

            <button
              type="button"
              onClick={(e) => getTasks('completed')}
              className="p-3 lg:p-6 w-full border-2 border-gray-200 bg-gradient-to-r from-black to-green-500 text-transparent bg-clip-text rounded-xl cursor-pointer active:scale-[0.96] duration-200 ease-in shadow"
            >
              Выполненные
            </button>

          </div>
          <section className="flex flex-col gap-y-3 w-full">

            {todoList.length > 0
              ? (todoList.map((el, index) => (
                <Task key={index} id={index} task={el.task} status={el.status} complete={completeTask} remove={removeTask} />
              )))
              : (<div className="p-3 lg:p-6 w-full text-center font-bold text-xl lg:text-2xl border-2 border-gray-200 bg-gradient-to-r from-purple-500 via-rose-500 to-yellow-500 text-transparent bg-clip-text rounded-xl shadow">Пусто... Слишком пусто...</div>)}

          </section>
        </section>
      </article>
    </>
  );
}