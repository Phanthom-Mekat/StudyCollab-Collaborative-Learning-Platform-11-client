import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, ThumbsUp, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'Mastering Effective Study Techniques',
    description: 'Discover scientifically-proven methods to enhance your learning and retention. Learn about spaced repetition, active recall, and mind mapping.',
    readTime: '8 min read',
    date: 'Jan 15, 2025',
    category: 'Study Tips',
    img: "https://i.postimg.cc/FRd9C62S/Solve-complex-difficult-problem-by-simplification.webp",
    likes: 245,
    author: {
      name: 'Dr. Sarah Chen',
      role: 'Learning Specialist'
    },
    tags: ['Productivity', 'Learning'],
    link: 'https://www.mirrorreview.com/mastering-effective-study-techniques/'
  },
  {
    title: 'Time Management Secrets for Academic Success',
    description: 'Learn how top students balance their academic workload, extracurriculars, and personal life. Includes practical scheduling templates.',
    readTime: '6 min read',
    date: 'Jan 12, 2025',
    category: 'Productivity',
    img: "https://i.postimg.cc/qRLt0S15/image-283.jpg",
    likes: 189,
    author: {
      name: 'Prof. James Wilson',
      role: 'Academic Advisor'
    },
    tags: ['Time Management', 'Student Life'],
    link: 'https://uwaterloo.ca/future-students/missing-manual/high-school/top-time-management-tips-students'
  },
  {
    title: 'The Ultimate Guide to Exam Preparation',
    description: 'Comprehensive strategies for exam success, from creating study schedules to managing test anxiety. Includes practice techniques from top .',
    img: 'https://i.postimg.cc/3r1pH46x/1716190301034.jpg',
    readTime: '10 min read',
    date: 'Jan 10, 2025',
    category: 'Exam Tips',
    likes: 312,
    author: {
      name: 'Emma Thompson',
      role: 'Education Consultant'
    },
    tags: ['Exams', 'Study Guide'],
    link: 'https://www.topuniversities.com/student-info/health-and-support/exam-preparation-ten-study-tips'
  },
  {
    title: 'The Science of Memory and Learning',
    description: 'Explore the latest neuroscience research on memory formation and retention. Learn practical techniques to improve your memory and learning capacity.',
    readTime: '12 min read',
    date: 'Jan 8, 2025',
    category: 'Learning Science',
    img: "https://i.postimg.cc/tRKHqt66/65d4c87d8a2391ee42bc9213-Working-memory-effects-executive-function.png",
    likes: 278,
    author: {
      name: 'Dr. Michael Rivera',
      role: 'Neuroscience Researcher'
    },
    tags: ['Memory', 'Brain Science'],
    link: 'https://www.sciencedaily.com/releases/2023/12/231214142203.htm'
  },
  {
    title: 'Digital Note-Taking Strategies for Academic Success',
    description: 'Master the art of digital note-taking using modern tools and techniques. Includes comparisons of popular note-taking apps and organization methods.',
    readTime: '7 min read',
    date: 'Jan 5, 2025',
    category: 'Technology',
    img: "https://i.postimg.cc/Gp7ZZkrH/1-epyp-E-4-PDCv-YYCYkj20-DA.png",
    likes: 203,
    author: {
      name: 'Alex Kim',
      role: 'EdTech Specialist'
    },
    tags: ['Digital Skills', 'Productivity'],
    link: 'https://www.studysmarter.co.uk/magazine/digital-note-taking/'
  },
  {
    title: 'Building Strong Study Groups for Effective Learning',
    description: 'Learn how to create and maintain effective study groups. Includes tips for virtual collaboration and maximizing group learning sessions. Includes comparisons of popular note-taking.',
    readTime: '9 min read',
    date: 'Jan 3, 2025',
    category: 'Collaboration',
    img: "https://i.postimg.cc/brbWDWnt/v4-460px-Form-a-Study-Group-Step-7-Version-3-jpg.webp",
    likes: 167,
    author: {
      name: 'Lisa Martinez',
      role: 'Learning Community Manager'
    },
    tags: ['Group Study', 'Collaboration'],
    link: 'https://www.indeed.com/career-advice/career-development/study-group-tips'
  }
];

export function BlogsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? blogPosts : blogPosts.slice(0, 3);

  const handleReadMore = (link) => {
    window.open(link, '_blank');
  };

  return (
    <section className="py-16 dark:bg-gray-900 dark:text-gray-300" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold dark:text-gray-100 mb-4">Latest from Our Blog</h2>
          <p className="text-lg dark:text-gray-400 max-w-2xl mx-auto">
            Discover insights and strategies to enhance your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <Card key={index} className="group hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
              <CardHeader className="relative p-0">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-400 dark:hover:bg-blue-500">
                    {post.category}
                  </Badge>
                </div>
                <img 
                  src={post.img} 
                  alt={post.title}
                  className="w-full h-52 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity duration-300 dark:brightness-75"
                />
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {post.likes}
                  </div>
                </div>

                <CardTitle className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </CardTitle>
                
                <CardDescription className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.description}
                </CardDescription>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm dark:text-gray-100">{post.author.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">{post.author.role}</div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6">
                <Button 
                  className="w-full group-hover:bg-blue-600 transition-colors duration-300 dark:hover:bg-blue-500"
                  onClick={() => handleReadMore(post.link)}
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="hover:bg-blue-50 dark:hover:bg-blue-900"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All Articles'}
            <BookOpen className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BlogsSection;