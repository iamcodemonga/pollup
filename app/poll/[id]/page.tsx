import SinglePollFetcher from '@/components/fetcher/single'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

type Pageprops  = {
    params: Promise<{
        id: string;
    }>
}

export const dynamic = "force-dynamic";

const page = async({ params } : Pageprops) => {

    const { id } = await params;

    return (
        <div className="px-3 lg:px-20 bggg">
            <Navbar />
            <section className='w-full lg:flex justify-center mt-40'>
                <div className='lg:w-[700px] space-y-10'>
                    <SinglePollFetcher id={id} />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default page