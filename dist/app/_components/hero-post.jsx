import CoverImage from "./cover-image";
import Link from "next/link.js";
import DateFormatter from "./date-formatter";
import React from 'react';
export function HeroPost({ title, coverImage, date, excerpt, slug, }) {
    return (<section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug}/>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date}/>
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div>
      </div>
    </section>);
}
