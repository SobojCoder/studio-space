import { ArrowRight, Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryCard = ({studio}) => {
    return (
        <Link
              key={studio.category}
              href={`/studio-list?category=${encodeURIComponent(studio.category)}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#111518] p-6 transition duration-300 hover:-translate-y-1 hover:border-lime-400/40"
            >
              

              <h3 className="mt-5 text-lg font-semibold text-white">
                {studio.category}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {studio.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime-400">
                Explore spaces
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
    );
};

export default CategoryCard;