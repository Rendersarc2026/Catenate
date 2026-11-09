import Image from "next/image";
import Link from "next/link";

import { formatPostDate, type BlogPost } from "@/data/catenate";
import { cn } from "@/lib/utils";

/*
 * One article as an image-led card, linking to its full page. `compact` drops
 * the excerpt and uses a wider image, for the home page teaser.
 */
export function PostCard({
  post,
  compact = false,
}: {
  post: BlogPost;
  compact?: boolean;
}) {
  return (
    <article className="group/post">
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-[18px] bg-[#e6e7ec]",
            compact
              ? "aspect-[16/9] lg:aspect-auto lg:h-[clamp(140px,22svh,260px)]"
              : "aspect-[4/3]",
          )}
        >
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-800 ease-expo group-hover/post:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        <p
          className={cn(
            "text-[12px] tracking-[0.08em] text-ink/55 uppercase",
            compact ? "mt-4" : "mt-5",
          )}
        >
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.readTime}
        </p>
        <h3 className="mt-2.5 text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.25] font-medium tracking-[-0.02em] text-ink underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover/post:decoration-ink/40">
          {post.title}
        </h3>
        {!compact && (
          <p className="mt-2.5 text-[14.5px] leading-[1.55] text-ink/70">
            {post.excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}
