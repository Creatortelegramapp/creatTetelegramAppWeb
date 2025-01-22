import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const Slider = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const items = [
    { title: 'Հեռուստացույց', icon: '📺' },
    { title: 'Պլանշետներ', icon: '📱' },
    { title: 'Հեռախոսներ', icon: '📞' },
    { title: 'Համակարգիչներ', icon: '💻' },
    { title: 'Մոնիտորներ', icon: '🖥️' },
    { title: 'Ժամացույցներ', icon: '⌚' },
    { title: 'Պրոյեկտորներ', icon: '📽️' },
    { title: 'Ականջակալներ', icon: '🎧' },
    { title: 'Տպիչներ', icon: '🖨️' },
    { title: 'Տեսախցիկներ', icon: '📷' },
    { title: 'Քաշակշեռներ', icon: '⚖️' },
    { title: 'Ֆոտոխցիկներ', icon: '📸' },
    { title: 'Մարտկոցներ', icon: '🔋' }
  ];


  return (
    <div className="w-full py-[40px]">
      <div className="max-w-[1175px] mx-auto bg-white rounded-md shadow-md p-8">
        <Carousel
          responsive={responsive}
          containerClass="carousel-container"
          itemClass="carousel-item-center"
          centerMode={true}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="slider-item flex flex-col items-center justify-center text-center bg-gray-100 p-5 rounded-md shadow-md space-y-3"
            >
              <div className="text-[36px]">{item.icon}</div>
              <h3 className="text-lg font-bold text-black">{item.title}</h3>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
