import { useEffect } from 'react';

export function useScrollAnimation(ready = true) {
  useEffect(() => {
    if (!ready) return;

    const showIfVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 40 && rect.bottom > 0;
      if (inView) el.classList.add('visible');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      el.classList.add('scroll-animate');
      showIfVisible(el);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ready]);
}
