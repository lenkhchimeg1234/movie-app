import { Header } from "@/app/_features/Header";
import { MovieDetail } from "./MovieDetail";
import { MoreLikeMovieList } from "@/app/movie/[id]/MoreLikeMovieList";
import { Footer } from "@/app/_features/Footer";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-[1440px] flex flex-col  gap-[52px] ">
        <Header />
        <MovieDetail />
        <MoreLikeMovieList title={"More like this"} />
        <Footer />
      </div>
    </div>
  );
}
