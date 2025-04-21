import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const reviews = [
  {
    name: "Martin Bruce",
    username: "Entrepreneur and writer",
    body: "A great market researching tool, one of the best in the industry.",
    img: "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Angela Scott",
    username: "Product manager",
    body: "We finally don't have to build what no one wants, thanks to Reapoll",
    img: "https://images.pexels.com/photos/5971247/pexels-photo-5971247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Tom Nicholas",
    username: "business developer",
    body: "Market analysis made easy, Reapoll to the world 👍.",
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Kenedy Mike",
    username: "movie producer",
    body: "A great way to know what my viewers want and how they rate my movies.",
    img: "https://images.pexels.com/photos/31649910/pexels-photo-31649910/free-photo-of-young-man-in-stylish-outfit-checking-watch-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Jude Cornelius",
    username: "sales and marketing expert",
    body: "Knowing your target audience is a key step in selling anything, every marketer needs Reapoll",
    img: "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Queen Austin",
    username: "Author and speaker",
    body: "A simple poll can save you so much time, energy and money. Reapoll is really a life saver💪 ",
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
