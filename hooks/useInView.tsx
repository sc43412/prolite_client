import { MutableRefObject, useEffect, useState } from "react";

function useInView(options = {}, ref: MutableRefObject<null>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(
        entry.isIntersecting &&
          entry.boundingClientRect.bottom <= window.innerHeight
      );
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInView;
}

export default useInView;
