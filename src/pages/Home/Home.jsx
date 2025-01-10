import TakeAssignment from "@/components/Home/TakeAssignment";
import Banner from "../../components/Home/Banner";
import FeatureSection from "../../components/Home/FeatureSection";
import Faq from "@/components/Home/Faq";
import Testimonials from "@/components/Home/Testimonials";
import BlogsSection from "@/components/Home/BlogsSection";
import NewsLetter from "@/components/Home/NewsLetter";

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeatureSection/>
            <TakeAssignment/>
            <BlogsSection/>
            <Testimonials/>
            <Faq/>
            <NewsLetter/>
        </div>
    );
};

export default Home;