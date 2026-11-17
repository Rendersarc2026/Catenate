import { LoaderMark } from "@/components/site/page-loader"

/* Shown while a route's content is still streaming in on navigation. */
export default function Loading() {
  return (
    <div className="grid min-h-dvh place-items-center bg-white">
      <LoaderMark />
    </div>
  )
}
