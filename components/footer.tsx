export const Footer = () => {
    return (
        <footer className="tracking-wide">
            <section className="flex justify-center lg:justify-between items-center">
                <div className="hidden lg:flex flex-col gap-y-3">
                    <h2 className="font-bold text-sm uppercase">version</h2>
                    <h2 className="text-xl">2024 Edition</h2>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-y-3">
                    <h2 className="font-bold text-sm uppercase">socials</h2>
                    <div className="flex gap-x-3 text-xl">
                        <a href="https://github.com/PICKLEGENT" target="_blanc">GitHub</a>
                        <a href="https://t.me/AndrewRom" target="_blanc">Telegram</a>
                        <a href="https://www.instagram.com/picklegent?igsh=Ymt3N3o5dWpnYm5u&utm_source=qr" target="_blanc">Instagram</a>
                    </div>
                </div>
            </section>
            <div className="hidden lg:flex justify-center items-center mt-6 text-center">
                <a
                    href="https://github.com/PICKLEGENT"
                    title='Chief of button coloring'
                    target="_blanc"
                    className="text-sm text-neutral-500 leading-relaxed"
                >
                    Code by<br />Andrew Romanov
                </a>
            </div>
        </footer>
    )
}