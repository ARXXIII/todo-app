export const ErrorModal = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/20 z-10">
            <div className="w-full lg:w-fit p-6 lg:p-12 text-center text-neutral-100 border-2 border-rose-600 bg-rose-500 rounded-xl shadow">
                <h1 className="font-black text-4xl">Так нельзя</h1>
                <h2 className="mt-6 text-3xl">Задача тоже хочет имя</h2>
            </div>
        </div>
    )
}