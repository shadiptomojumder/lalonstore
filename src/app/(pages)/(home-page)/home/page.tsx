import HeroSection from "../homepage-sections/HeroSection";
import PopularCategorieSection from "../homepage-sections/PopularCategorySection";
import ShocaseSection from "../homepage-sections/ShocaseSection";
// import PopularProductSection from "../homepage-sections/PopularProductSection/PopularProductSection";

const HomePage = () => {
    return (
        <main className="bg-white">
            <section className="">
                <HeroSection />
                <ShocaseSection />
                <PopularCategorieSection />
                <ShocaseSection />

                {/* <PopularProductSection /> */}
            </section>
        </main>
    );
};

export default HomePage;
