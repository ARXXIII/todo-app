export const Header = () => {
    return (
        <header className="flex justify-center lg:justify-between items-center gap-x-12 font-black text-4xl tracking-wide shrink-0">
            <h1>AR23 | TODO App</h1>
            <a href="https://github.com/PICKLEGENT/todo-app" target="_blanc" className="hidden lg:block bg-gradient-to-r from-black to-green-500 text-transparent bg-clip-text">GitHub репозиторий</a>
        </header>
    )
}