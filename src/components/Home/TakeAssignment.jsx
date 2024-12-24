import IconCloud from "../ui/icon-cloud";
const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ];
const TakeAssignment = () => {
  return (
    <section className="py-8 mb-15" data-aos="fade-up"> 
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Take Assignment In Your Favorite Language
        </h2>
        <p className="text-gray-600 dark:text-gray-300  mb-6">
          Access and complete your assignments with ease using our intuitive platform.
        </p>
        <div className="flex justify-center bg-background p-4"  data-aos="fade-up"    data-aos-delay="200" >
        <IconCloud size="large" iconSlugs={slugs}  />
        </div>
      </div>
    </section>
  );
};

export default TakeAssignment;
