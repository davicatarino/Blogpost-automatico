import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
const CoverImage = ({ title, src, slug }) => {
    const image = (<Image src={src} alt={`Cover Image for ${title}`} className={cn("shadow-sm h-[200px] w-[200px]", {
            "hover:shadow-lg transition-shadow duration-200 conta": slug,
        })} width={200} height={200}/>);
    return (<div className="sm:mx-0">
      {slug ? (<Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>) : (image)}
    </div>);
};
export default CoverImage;
