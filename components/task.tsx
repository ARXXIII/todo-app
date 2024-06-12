import { cn } from "@/lib/utils";
import { TaskProps } from "@/types";
import { FiCircle } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

export const Task = ({ id, task, status, complete, remove, display }: TaskProps) => {
    return (
        <div
            className={cn("flex justify-between items-center gap-x-3 lg:gap-x-6 p-3 lg:p-6 w-full text-xl lg:text-2xl border-2 border-gray-200 rounded-xl shadow",
                display === false && 'hidden',
                status === 'completed' && 'border-green-500 bg-green-500/20')}
        >
            <div className="flex justify-between items-center gap-x-3 lg:gap-x-6">

                {status === 'completed'
                    ? (<FiCheckCircle className="text-green-500" />)
                    : (<FiCircle className="text-cyan-500 cursor-pointer" onClick={(e) => complete(id)} />)
                }

                <h1 className={cn(status === 'completed' && 'text-gray-500/60 line-through')}>{task}</h1>
            </div>
            <FiXCircle
                onClick={(e) => remove(id)}
                className="text-rose-500 lg:text-gray-500/60 lg:hover:text-rose-500 duration-200 ease-in cursor-pointer"
            />
        </div>
    )
}