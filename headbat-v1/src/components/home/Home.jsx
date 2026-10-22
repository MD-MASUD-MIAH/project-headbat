import Hero from "../hero/Hero";
import AboutUs from "./AboutUs";
import ClientsSection from "./ClientsSection";
import FAQSection from "./FAQSection";
import FeaturedProjects from "./FeaturedProjects";
import Services from "./Services";
import StatisticsSection from "./StatisticsSection";
import TeamSection from "./TeamSection";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <ClientsSection />
      <FeaturedProjects />
      <WhyChooseUs />
      <Services />
      <AboutUs />
      <Testimonials />
      <StatisticsSection />
      <TeamSection />
      <FAQSection />
    </div>
  );
};

export default Home;
