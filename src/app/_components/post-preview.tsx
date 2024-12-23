import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import CustomButton from './button';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({ title, coverImage, date, excerpt, slug }: Props) {
  return (
    <div>
      <div className="mb-5 flex justify-center">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug flex text-center">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4 flex justify-center">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <CustomButton  className={'bg-black text-white rounded-2xl'}>


        <Link href={`/posts/${slug}`} className="hover:underline">
          <span>Ler matéria</span>
        </Link>
      </CustomButton>

    </div>
  );
}
