export const Header = () => {
    return (
        <header className="flex justify-center lg:justify-between items-center gap-x-12 font-black text-4xl tracking-wide shrink-0">
            <h1 className="bg-gradient-to-r from-yellow-400 to-purple-800 text-transparent bg-clip-text">AR23 | TODO App</h1>
            <a
                href="https://github.com/PICKLEGENT/todo-app"
                target="_blanc"
                className="hidden lg:block bg-gradient-to-r from-github-dark to-github-green text-transparent bg-clip-text"
            >
                GitHub репозиторий
            </a>
        </header>
    )
}