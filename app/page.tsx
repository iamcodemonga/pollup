import LandingPollFetcher from "@/components/fetcher/landing";
import Footer from "@/components/Footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Navbar from "@/components/Navbar";
import { TwitterTestimonials } from "@/components/TwitterTestimonials";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";
import { JoinReason, QA } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const metadata = {
  title: `Create & Participate in Polls, Earn massive Rewards | ${process.env.BRANDNAME}`,
  description: 'Create free polls or vote on trending topics to earn redeemable massive rewards.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    images: [
      {
        url: `${process.env.ROOTURL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'reapoll - Vote and reap',
      }
    ]
  }
}

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();  

  return (
    <div className="w-full">
      <Navbar user={user?.id as string} />
      <section className="w-full px-3 lg:px-20">
        <div className="w-full flex justify-center mt-52 lg:mt-60">
          <div className="w-full lg:w-3/5 px-0 lg:px-0 flex flex-col justify-center items-center">
            <BlurFade direction="up" inView>
              <h1 className="font-semibold text-3xl lg:text-5xl !leading-[1.2] text-center capitalize">Where Polling Creates <span className="text-primary">Value</span> and Voting Reaps <span className="text-primary">Rewards.</span></h1>
            </BlurFade>
            <div className="w-full flex justify-center">
              <BlurFade direction="up" delay={0.25} inView>
                <p className="text-center text-foreground/80 mt-7 w-full lg:w-[500px]">Whether you’re gathering feedback or sharing your opinion, Reapoll makes it rewarding for everyone!</p>
              </BlurFade>
            </div>
            <div className="w-full flex justify-center mt-7 space-x-3">
              <Link href="/create" className="flex justify-between items-center space-x-10 px-5 py-3 text-background bg-primary border border-primary rounded-full text-[12px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>Create Poll
              </Link>
              <Link href={user?.id ? "/explore" : "/signup"} className="flex justify-between items-center space-x-10 px-5 py-3 bg-transparent text-foreground rounded-full text-[12px] border border-foreground">{user?.id ? "Start voting " : "Sign up "}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>     
          </div>
        </div>
        <div className="w-full flex justify-center mt-20 lg:mt-16">
          <div className="flex flex-col justify-center items-center">
            <div className="flex mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="capitalize text-base font-bol text-foreground/70 text-center px-5">Trusted by over <strong className="text-primary">2,000+</strong> users worldwide</h3>
            <div className="hidden lg:flex space-x-8 items-center mt-10">
              <div>
                <h2 className="text-center text-5xl font-bold text-primary">
                  <NumberTicker value={2000} className="!text-primary" style={{letterSpacing: .5}} />+
                </h2>
                <p className="text-center text-sm text-foreground/80">Users</p>
              </div>
              <Separator orientation="vertical" className="h-36" />
              <div>
                <h2 className="text-center text-5xl font-bold text-primary">
                  <NumberTicker value={5000} className="!text-primary" style={{letterSpacing: .5}} />+
                </h2>
                <p className="text-center text-sm text-foreground/80">Polls</p>
              </div>
              <Separator orientation="vertical" />
              <div>
                <h2 className="text-center text-5xl font-bold text-primary">
                  <NumberTicker  value={30} className="!text-primary" style={{letterSpacing: .5}} />K+
                </h2>
                <p className="text-center text-sm text-foreground/80">Votes</p>
              </div>
              <Separator orientation="vertical" className="h-36" />
              <div>
                <h2 className="text-center text-5xl font-bold text-primary">$<NumberTicker value={10} className="!text-primary" style={{letterSpacing: .5}} />K+</h2>
                <p className="text-center text-sm text-foreground/80">Reaped Rewards</p>
              </div>
            </div>
            <div className="lg:hidden space-y-4 mt-10">
              <div>
                <h2 className="text-center text-3xl font-bold text-primary"><NumberTicker value={2000} className="!text-primary" style={{letterSpacing: .5}} />+</h2>
                <p className="text-center text-sm text-foreground/80">Users</p>
              </div>
              <Separator orientation="horizontal" className="w-60" />
              <div>
                <h2 className="text-center text-3xl font-bold text-primary"><NumberTicker value={5000} className="!text-primary" style={{letterSpacing: .5}} />+</h2>
                <p className="text-center text-sm text-foreground/80">Polls</p>
              </div>
              <Separator orientation="horizontal" />
              <div>
                <h2 className="text-center text-3xl font-bold text-primary"><NumberTicker  value={30} className="!text-primary" style={{letterSpacing: .5}} />K+</h2>
                <p className="text-center text-sm text-foreground/80">Votes</p>
              </div>
              <Separator orientation="horizontal" />
              <div>
                <h2 className="text-center text-3xl font-bold text-primary">$<NumberTicker value={10} className="!text-primary" style={{letterSpacing: .5}} />K+</h2>
                <p className="text-center text-sm text-foreground/80">Reaped Rewards</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-3 lg:px-20">
        <div className="w-full grid grid-cols-2 mt-28 gap-y-28 gap-x-12 items-center">
          <div className="col-span-2 lg:col-span-1 w-full">
            {/* <SingleChoice data={timeline[1]} /> */}
            <LandingPollFetcher id="a2c4ac82-1b54-4734-bf37-91e1201e78a0" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div>
            <h1 className="font-semibold text-3xl lg:text-5xl text-center !leading-[1.2] text-foreground capitalize mb-12">Getting <span className="font-semibold text-primary">Started</span></h1>
              <p className="text-xs text-primary mb-3">For Voters</p>
              <div className="flex items-start space-x-2 mb-8">
                <p><strong>Sign up:</strong> Join Reapoll in seconds—no personal info needed. Just an email!</p>
              </div>
              <div className="flex items-start space-x-2 mb-8">
                <p><strong>Explore Polls:</strong> Dive into trending polls on topics like tech, business, and more.</p>
              </div>
              <div className="flex items-start space-x-2 mb-14">
                <p><strong>Reap rewards:</strong> Earn rewards for every vote—Your voice pays off!</p>
              </div>
              <p className="text-xs text-primary mb-3">For Poll Creators</p>
              <div className="flex items-start space-x-2 mb-8">
                <p><strong>Create account: </strong> Sign up and start building polls in minutes—no tech skills needed.!</p>
              </div>
              <div className="flex items-start space-x-2 mb-8">
                <p><strong>Create polls:</strong> Craft polls with questions, images, or videos—share with the world.</p>
              </div>
              <div className="flex items-start space-x-2 mb-8">
                <p><strong>Get Valuable Insights:</strong> Get real-time analytics on voter demographics and trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-3 lg:px-20">
        <div className="flex justify-center mt-28 lg:mt-40">
          <div className="lg:w-3/4 w-full px-5 lg:px-0">
            <h1 className="font-semibold text-3xl lg:text-5xl text-center !leading-[1.2] text-foreground capitalize">Why <span className="font-semibold text-primary">Join</span> Us?</h1>
            <div className="w-full flex justify-center">
              <p className="text-center text-foreground/80 mt-7 w-[600px]">Join a platform where your voice matters. Earn rewards for voting or gain insights by creating polls—everyone wins. Start shaping decisions and reaping benefits today!</p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 mt-20">
          {JoinReason.length > 0 ? JoinReason.map((reason, index) => <div className={`p-5 rounded-lg ${index==0 ? "bg-gray-950 dark:bg-primary" : "bg-muted"}`} key={index}>
            <p className="mb-2 text-2xl">{reason.icon}</p>
            <h3 className={`mb-2 text-sm ${index==0 ? "text-primary dark:text-background" : "text-primary"}`}>{reason.title}</h3>
            <p className={`${index==0 ? "text-background" : "text-foreground"}`}>{reason.description}</p>
          </div>
          ) : null}
        </div>
      </section>
      <section className="w-full">
        <div className="flex justify-center mt-40 lg:mt-52">
          <div className="lg:w-3/4 w-full px-5 lg:px-0">
            <h1 className="font-semibold text-3xl lg:text-5xl text-center !leading-[1.2] text-foreground capitalize">What <span className="font-semibold text-primary">people</span> are saying</h1>
            <div className="w-full flex justify-center">
              <p className="text-center text-foreground/80 mt-7 w-[600px]">Don’t just take our word for it. Hear from thousands of users who’ve earned rewards and gained valuable insights. Join the community that’s changing how polls work!</p>
            </div>
          </div>
        </div>
        <TwitterTestimonials />
      </section>
      <section className="w-full px-3 lg:px-28 mb-40 lg:mb-60">
          <div className="flex justify-center mt-28 lg:mt-28">
              <div className="lg:w-3/4 w-full">
              <h1 className="font-semibold text-3xl lg:text-5xl text-center !leading-[1.2] text-foreground capitalize">Frequently asked <span className="font-semibold text-primary">Questions.</span></h1>
              <div className="w-full flex justify-center">
                  <p className="text-center text-foreground/80 mt-7 w-[600px] hidden">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum facilis ut soluta accusamus culpa laudantium, ipsum voluptas omnis nisi a.</p>
              </div>
              </div>
          </div>
          <div className="flex justify-center mt-14 lg:mt-20">
              <div className="w-full lg:w-1/2 px-3 lg:px-0">
              <Accordion type="single" collapsible className="w-full bg-transparent">
                {QA.length > 0 ? QA.map(({ question, answer }, index) => <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent className="text-foreground/80">{answer}</AccordionContent>
                  </AccordionItem>) : null}
              </Accordion>
              </div>
          </div>
      </section>
      <section className="w-full">
        <div className="flex justify-center mt-16">
            <div className="w-full bg-secondary flex justify-center py-40 lg:py-48 lg:rounded-2x">
              <div className="w-full lg:w-2/3">
                <h2 className="text-center text-2xl lg:text-5xl text-black px-3 !leading-normal">Share Your Voice, Shape Decisions, and Reap Exciting Rewards</h2>
                <div className="w-full flex justify-center mt-10 lg:mt-12 space-x-4">
                  <Link href="/" className="flex justify-between items-center space-x-10 px-5 py-3 bg-background text-foreground rounded-full text-[12px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>Create Poll
                  </Link>
                  <Link href={user?.id ? "/explore" : "/signup"} className="flex justify-between items-center space-x-10 px-5 py-3 bg-backgroun text-background rounded-full text-[12px] border border-background">{user?.id ? "Start voting " : "Sign up "}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </section>
      <Footer />
    </div>
  );
}
