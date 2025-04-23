import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PollForm from "@/components/forms/Poll"
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { getUserById } from "@/lib/queries/server";


export const metadata: Metadata = {
    title: 'Create Custom Polls & Surveys for Free',
    description: 'Design polls with multiple options and categories. Gather insights and share your poll.',
    alternates: {
      canonical: '/create-poll'
    }
  }

const page = async() => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log("user: "+user?.id);
    let eligible: boolean = false;
    let details;

    if (user?.id) {
      details = await getUserById(user.id, ["achievement", "balance"]) as unknown as { achievement: string[], balance: number }
      
      if (details.achievement.includes("poll") == false) {
        eligible = true;
      }
    }

    console.log("details: "+details);
    

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
                    <PollForm user={user?.id as string} eligible={eligible} balance={details?.balance} />
                </div>
            </section>
            <Footer />
            <HowToSchema />
        </div>
    )
}

function HowToSchema() {
    return (
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": `Create a Poll on ${process.env.BRANDNAME}`,
          "description": "Step-by-step guide to creating polls",
          "step": [
            {
              "@type": "HowToStep",
              "text": "Click the Create Poll button"
            },
            // Add more steps
          ]
        })}
      </script>
    )
  }

export default page