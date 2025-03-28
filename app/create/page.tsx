import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PollForm from "@/components/forms/Poll"
import { createClient } from "@/utils/supabase/server";


const page = async() => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log("user: "+user?.id);

    return (
        <div className="px-1 lg:px-20">
            <Navbar user={user?.id as string} />
            <section className="py-20 mt-20 lg:mt-28">
                <h1 className="text-center text-5xl">Create a Poll</h1>
                <div className="w-full flex justify-center">
                    <div className="w-full my-4">
                        <p className="text-center text-foreground/80">Get valuable insights on anything from people around the world.</p>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    <PollForm user={user?.id as string} />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default page