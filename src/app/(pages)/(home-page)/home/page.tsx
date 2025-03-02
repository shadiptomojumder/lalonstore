import FeaturedProducts from "../homepage-sections/FeaturedProducts";
import HeroSection from "../homepage-sections/HeroSection";
import PopularCategorieSection from "../homepage-sections/PopularCategorySection";
import ShocaseSection from "../homepage-sections/ShocaseSection";
import WeekendDeals from "../homepage-sections/WeekendDeals";

const HomePage = () => {
    return (
        <main className="bg-white">
            <section className="">
                <HeroSection />
                <ShocaseSection />
                <PopularCategorieSection />
                <FeaturedProducts />
                <WeekendDeals />
            </section>
        </main>
    );
};

export default HomePage;
