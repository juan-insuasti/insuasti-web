import { Hero } from '@/ui/Hero';
import { About } from './(homepage)/about';

export default function Home() {
  return (
    <div className="mb-28 flex justify-center md:mb-0">
      <div className="container">
        <Hero />
        <About />
      </div>
    </div>
  );
}
