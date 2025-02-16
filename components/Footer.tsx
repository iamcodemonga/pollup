import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full">
        <div className="lg:flex justify-between items-start py-20 mt-5 lg:px-20 space-y-16 lg:space-y-0">
            <div className="space-y-4">
                <Link href={"/"} className="block text-center">Home</Link>
                <Link href={"/"} className="block text-center">Contact</Link>
                <Link href={"/"} className="block text-center">Join Us</Link>
            </div>
            <div className="space-y-4">
                <Link href={"/"} className="block text-center">Twitter</Link>
                <Link href={"/"} className="block text-center">Discord</Link>
                <Link href={"/"} className="block text-center">LinkedIn</Link>
            </div>
            <div className="space-y-4">
                <Link href={"/"} className="block text-center">Terms Of Service</Link>
                <Link href={"/"} className="block text-center">Privacy Policy</Link>
            </div>
        </div>
        <div className="space-y-2 mb-5">
            <h4 className="text-xs text-center">Developed by team <a href="https://codemonga.netlify.app" className="text-sky-500 text-sm font-bold">@codemonga</a></h4>
            <p className="text-center text-[10px] text-slate-400">&copy;pollup 2025</p>
        </div>
    </footer>
  )
}

export default Footer