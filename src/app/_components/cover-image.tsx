import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
    src={src}
    alt={`Cover Image for ${title}`}
    className={cn("shadow-sm h-[300px] w-[300px]", {
      "hover:shadow-lg transition-shadow duration-200 conta": slug,
    })}
    width={300}
    height={300}
  />

  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
