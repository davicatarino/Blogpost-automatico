import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
const CoverImageSlug = ({ title, src, slug }) => {
    const image = (<Image src={src} alt={`Cover Image for ${title}`} className={cn("shadow-sm ", {
            "hover:shadow-lg transition-shadow duration-200 conta": slug,
        })} width={700} height={400}/>);
    return (<div className="sm:mx-0">
      {slug ? (<Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>) : (image)}
    </div>);
};
export default CoverImageSlug;
