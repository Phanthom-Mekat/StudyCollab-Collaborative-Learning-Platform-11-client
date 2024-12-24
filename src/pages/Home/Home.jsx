import TakeAssignment from "@/components/Home/TakeAssignment";
import Banner from "../../components/Home/Banner";
import FeatureSection from "../../components/Home/FeatureSection";
import Faq from "@/components/Home/Faq";
import Testimonials from "@/components/Home/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeatureSection/>
            <TakeAssignment/>
            <Testimonials/>
            <Faq/>
        </div>
    );
};

export default Home;