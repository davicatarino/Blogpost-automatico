import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
export function PostHeader({ title, coverImage, date }) {
    return (<>
      <PostTitle>{title}</PostTitle>

      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage}/>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">

        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date}/>
        </div>
      </div>
    </>);
}
