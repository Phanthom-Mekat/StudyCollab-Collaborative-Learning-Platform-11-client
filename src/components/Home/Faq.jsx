import { useState } from 'react';
import { ChevronUp, ChevronDown, BookOpen, Users, Award, Clock, Shield, Sparkles } from 'lucide-react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
      question: "How does the group study assignment system work?",
      answer: "Our platform enables collaborative learning through peer-reviewed assignments. You can create assignments, submit your work, and grade assignments from other students. This creates a dynamic learning environment where everyone contributes to each other's growth and understanding."
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      question: "Can I collaborate with specific friends on assignments?",
      answer: "Yes! Every registered user becomes part of our study community. You can see assignments created by all users, submit your work, and participate in peer grading. This open collaboration system helps you learn from diverse perspectives and teaching styles."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      question: "How is the grading system managed?",
      answer: "Our peer grading system allows users to evaluate assignments submitted by others. When grading, you can provide detailed feedback and marks based on the assignment criteria. However, to maintain fairness, you cannot grade your own submissions."
    },
    {
      icon: <Clock className="w-6 h-6 text-rose-500" />,
      question: "What happens if I miss an assignment deadline?",
      answer: "Each assignment comes with a specified due date. While you can still submit after the deadline, it's best to complete assignments on time to maintain steady progress and active participation in the group study environment."
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      question: "How secure is my submitted work?",
      answer: "Your submissions are secure and visible only to registered users. We use Google Docs links for assignment submissions, giving you control over sharing permissions while maintaining academic integrity."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      question: "What makes this platform different from traditional study methods?",
      answer: "Our platform combines collaborative learning, peer assessment, and flexible scheduling. You get to both teach and learn, which reinforces understanding. Plus, the diverse difficulty levels and assignment types help you progress at your own pace."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20  dark:bg-gray-900" data-aos='fade-up'>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Everything you need to know about our collaborative learning platform
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" data-aos='fade-up'
          >
            <button
              className="w-full p-4 text-left flex items-center justify-between gap-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {faq.icon}
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
              </div>
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="p-4 text-gray-600 dark:text-gray-300  dark:bg-gray-850">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;