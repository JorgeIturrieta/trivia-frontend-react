import React, { FunctionComponent } from 'react';
import { Icategory } from '../graphql/queries/getCategories';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
type CarouselProps = {
  categories: Icategory[];
};
export const CategoryCarousel: FunctionComponent<CarouselProps> = ({
  categories,
}: CarouselProps) => {
  return (
    <Carousel>
      {categories.map((c) => (
        <div key={c.id}>
          <img
            src="https://res.cloudinary.com/dhklxujxz/image/upload/v1632090154/trivia/ginobili_qmqciw.jpg"
            alt={c.name}
          />
          <Link to={`./questions/${c.id}`}>
            <p className="legend">{c.name}</p>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};
