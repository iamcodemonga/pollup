import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PollForm from "@/components/forms/Poll"


const page = () => {
    return (
        <div className="px-3 lg:px-20">
            <Navbar />
            <section className="py-20 mt-20 lg:mt-28">
                <h1 className="text-center text-5xl">Create a Poll</h1>
                <div className="w-full flex justify-center">
                    <div className="w-full my-4">
                        <p className="text-center text-foreground/80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, ad?</p>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    <PollForm />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default page