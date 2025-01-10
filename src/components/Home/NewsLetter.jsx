import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  Check, 
  X, 
  Loader2,
  BookOpen,
  Trophy,
  Calendar
} from 'lucide-react';

export function NewsLetter() {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [subscriptionType, setSubscriptionType] = useState('weekly');

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.sendForm(
        'service_7rof9ub',
        'template_216253q',
        form.current,
        '53yN5YoKeGJ2xfkxW'
      );

      if (result.text === 'OK') {
        setStatus({ 
          type: 'success', 
          message: `Successfully subscribed to ${subscriptionType} updates! Check your email to confirm.` 
        });
        setEmail('');
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to subscribe. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center relative overflow-hidden dark:bg-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#4f46e5_12%,transparent_12.5%,transparent_87%,#4f46e5_87.5%,#4f46e5),linear-gradient(150deg,#4f46e5_12%,transparent_12.5%,transparent_87%,#4f46e5_87.5%,#4f46e5),linear-gradient(270deg,#4f46e5_12%,transparent_12.5%,transparent_87%,#4f46e5_87.5%,#4f46e5)] bg-opacity-40 dark:bg-opacity-20" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-accent">
            Stay Updated with StudyCollab
          </h2>

          <p className="text-lg mb-6 text-accent/80">
            Join our community of successful students and unlock premium content
          </p>

          {/* Subscription Options */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['weekly', 'monthly'].map((type) => (
              <Button
                key={type}
                onClick={() => setSubscriptionType(type)}
                variant={subscriptionType === type ? "default" : "secondary"}
                className={`capitalize ${
                  subscriptionType === type 
                    ? 'bg-white text-primary dark:bg-accent dark:text-dark' 
                    : 'bg-white/10 hover:bg-white/20 dark:bg-dark/50'
                }`}
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: BookOpen,
                title: "Study Guides",
                description: "Access premium materials"
              },
              {
                icon: Trophy,
                title: "Track Progress",
                description: "Monitor achievements"
              },
              {
                icon: Calendar,
                title: "Reminders",
                description: "Never miss deadlines"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 dark:bg-dark/30 p-4 rounded-lg backdrop-blur-sm"
              >
                <feature.icon className="w-6 h-6 mb-2 mx-auto text-accent" />
                <h3 className="font-semibold text-sm mb-1 dark:text-accent">{feature.title}</h3>
                <p className="text-xs text-accent/80">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Subscription Form */}
          <form ref={form} onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <div className="relative w-full sm:w-96">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input
                  type="email"
                  name="user_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 h-12 text-dark dark:text-accent dark:bg-dark dark:border-accent/20 border-2 focus:ring-2 focus:ring-secondary"
                />
                <input 
                  type="hidden" 
                  name="subscription_type" 
                  value={subscriptionType} 
                />
              </div>
              <Button 
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 h-12 bg-accent text-primary hover:bg-accent/90 dark:bg-accent dark:text-dark dark:hover:bg-accent/90 transition-all duration-200"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </div>

            {status && (
              <Alert className={`mt-4 ${
                status.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white border-none dark:bg-opacity-90`}>
                <div className="flex items-center gap-2">
                  {status.type === 'success' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                  <AlertTitle>
                    {status.type === 'success' ? 'Success!' : 'Error'}
                  </AlertTitle>
                </div>
                <AlertDescription>{status.message}</AlertDescription>
              </Alert>
            )}
          </form>

          {/* Quick Benefits */}
          <div className="mt-6 grid grid-cols-2 gap-2 max-w-lg mx-auto text-left text-xs">
            {[
              "Personalized recommendations",
              "Weekly progress reports",
              "Premium resources",
              "Community access"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-1 text-accent/80">
                <Check className="w-3 h-3 text-secondary flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-accent/60 dark:text-accent/40">
            By subscribing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;