import { Header } from "./_features/Header";
import { Footer } from "./_features/Footer";
import { HeroSection } from "./_features/home/HeroSection";

import { MovieList } from "./_features/home/MovieList";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-[1440px] flex flex-col  gap-[52px] ">
        <Header />
        <HeroSection />
        <MovieList type="upcoming" title="Upcoming" />
        <MovieList type="top_rated" title="Top rated" />
        <MovieList type="popular" title="Popular" />
        <Footer />
      </div>
    </div>
  );
}
