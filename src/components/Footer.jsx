import { SiStudyverse } from "react-icons/si";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-base-200 text-base-content relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
          {/* Brand Section */}
          <aside className="space-y-4">
            <div className="flex items-center space-x-2 group">
            <SiStudyverse size={40} className="text-primary bg-gradient-to-r inline-flex mr-1 from-primary/15 to-secondary rounded-md px-0 dark:text-secondary dark:bg-gradient-to-r dark:from-primary/90 dark:to-primary" />
              <div className="text-2xl font-bold tracking-tight">
                Study<span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Collab</span>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Empowering students through collaborative learning and innovative educational solutions since {currentYear}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {[FaTwitter, FaGithub, FaLinkedin, FaInstagram].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-primary transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </aside>

          {/* Services Section */}
          <nav className="space-y-4">
            <h6 className="footer-title text-primary">Services</h6>
            {['Assignment Help', 'Study Groups', 'Mentorship', 'Resources'].map((item, i) => (
              <a key={i} className="block text-sm hover:text-primary transition-colors hover:translate-x-1 transform duration-200">
                {item}
              </a>
            ))}
          </nav>

          {/* Company Section */}
          <nav className="space-y-4">
            <h6 className="footer-title text-primary">Company</h6>
            {['About Us', 'Our Team', 'Careers', 'Contact'].map((item, i) => (
              <a key={i} className="block text-sm hover:text-primary transition-colors hover:translate-x-1 transform duration-200">
                {item}
              </a>
            ))}
          </nav>

          {/* Newsletter Section */}
          <div className="space-y-4 z-10 ">
            <h6 className="footer-title text-primary">Stay Updated</h6>
            <p className="text-sm opacity-80">Subscribe to our newsletter for latest updates</p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="input input-bordered w-full bg-base-100" 
              />
              <button className="btn bg-primary w-full hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300">
          <div className="p-6 text-center text-sm opacity-60">
            © {currentYear} StudyCollab. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;