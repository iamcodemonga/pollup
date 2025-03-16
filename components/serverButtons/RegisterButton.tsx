import { useFormStatus } from 'react-dom'
import MoonLoader from 'react-spinners/MoonLoader';

const RegisterButton = () => {

    const { pending } = useFormStatus();

    return (
        <button type='submit' className={`w-full flex justify-center items-center h-11 text-black rounded-lg ${pending ? "bg-muted" : "bg-primary"} text-sm`} disabled={pending}>{pending ? <MoonLoader color='hsl(var(--foreground))' size={20} loading={pending} /> : "submit"}</button>
    )
}

export default RegisterButton