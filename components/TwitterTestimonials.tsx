import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const reviews = [
  {
    name: "Aniekan ufot",
    username: "@thethirdmiracle",
    body: "Taking E-commerce to a new level. this is great.",
    img: "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Edimessiah",
    username: "@defimessiah",
    body: "you no longer have to worry about having a storefront, get a blink from @blinkstore.",
    img: "https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Promise Nicholas",
    username: "@promisenicolas",
    body: "you don't have any excuse for not making sales! @blinkstore just made it easier.",
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Ekemini Asuquo",
    username: "@kemzy",
    body: "I don't need a store to sell. All I need is a link from @blinkstore.",
    img: "https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "ogbodo conelius",
    username: "@coneliusogbodo",
    body: "A store with social media marketing all in one place! sales made easy, let's talk about @blinkstore.",
    img: "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Queen monday",
    username: "@officialqueenyluv",
    body: "I now sell my clothes effortlessly on twitter, no storefront. I love @blinkstore.",
    img: "https://images.pexels.com/photos/6785040/pexels-photo-6785040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-background hover:bg-muted",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-background dark:hover:bg-muted",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full object-cover h-9 w-9" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function TwitterTestimonials() {
  return (
    <div className="relative flex py-12 w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
