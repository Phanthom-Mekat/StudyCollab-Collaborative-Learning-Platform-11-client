import { Clock1, HeartHandshakeIcon, LockKeyhole, MessageCircleCode } from "lucide-react";
import { IoCreate } from "react-icons/io5";
import { MdGrading } from "react-icons/md";


const FeatureSection = () => {
    return (
        <div className="py-16 bg-light overflow-hidden" data-aos="fade-up" 
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        >
            <div>
                <h2
                    className="text-4xl text-center font-bold  pt-5 mb-4"
                    data-aos="fade-up"
                >
                    Our Features
                </h2>
                <p
                    className="text-center text-gray-500 md:w-8/12 mx-auto mb-16"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Online Group Study is a platform that allows students to study together
                    online.

                </p>
            </div>
            <ul
                className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
                data-aos="fade-up"
                data-aos-delay="300"
            >
                {/* Step 1 */}
                <li data-aos="fade-right" data-aos-anchor-placement="bottom-bottom">
                    <div className="timeline-middle p-3 bg-primary/60 rounded-full">
                        <HeartHandshakeIcon className="h-5 w-5" />
                    </div>
                    <div className="timeline-start mb-10 md:text-end">
                        <time className="font-mono italic">Feature 1</time>
                        <div className="text-lg font-bold">Collaborative Learning</div>
                        <p className="text-gray-600">
                        Connect with friends and study together in real-time.
                        </p>
                    </div>
                    <hr />
                </li>

           {/* Step 2 */}
                <li data-aos="fade-left" data-aos-anchor-placement="bottom-bottom">
                    <hr />
                    <div className="timeline-middle p-3 bg-primary/60 rounded-full">
                        <IoCreate className="h-5 w-5" />
                    </div>
                    <div className="timeline-end mb-10">
                        <time className="font-mono italic">Feature 2</time>
                        <div className="text-lg font-bold">Create Assignments</div>
                        <p className="text-gray-600">
                        Easily create and share assignments with your study group.
                        </p>
                    </div>
                    <hr />
                </li>
                

                {/* Step 3 */}
                <li data-aos="fade-right" data-aos-anchor-placement="bottom-bottom">
                    <hr />
                    <div className="timeline-middle p-3 bg-primary/60 rounded-full">
                        <MdGrading className="h-5 w-5" />
                    </div>
                    <div className="timeline-start mb-10 md:text-end">
                        <time className="font-mono italic">Feature 3</time>
                        <div className="text-lg font-bold">Peer Grading</div>
                        <p className="text-gray-600">
                        Grade your friends assignments and receive feedback on yours.                        </p>
                    </div>
                    <hr />
                </li>
                {/* Step 4 */}
                <li data-aos="fade-left" data-aos-anchor-placement="bottom-bottom">
                    <hr />
                    <div className="timeline-middle p-3 bg-primary/60 rounded-full">
                        <Clock1 className="h-5 w-5" />
                    </div>
                    <div className="timeline-end mb-10">
                        <time className="font-mono italic">Feature 4</time>
                        <div className="text-lg font-bold">Flexible Scheduling</div>
                        <p className="text-gray-600">
                        Set due dates and study at your own pace.
                        </p>
                    </div>
                    <hr />
                </li>
              
                {/* Step 5 */}
                <li data-aos="fade-right" data-aos-anchor-placement="bottom-bottom">
                    <hr />
                    <div className="timeline-middle p-3 bg-primary/60 rounded-full">
                        <MessageCircleCode className="h-5 w-5" />
                    </div>
                    <div className="timeline-start mb-10 md:text-end">
                        <time className="font-mono italic">Feature 5</time>
                        <div className="text-lg font-bold">Discussion Forums</div>
                        <p className="text-gray-600">
                        Engage in topic-specific discussions with your peers.
                        </p>
                    </div>
                    <hr />
                </li>
                {/* Step 5 */}
                <li data-aos="fade-left" data-aos-anchor-placement="bottom-bottom">
                    <hr />
                    <div className="timeline-middle p-3 bg-primary/60 rounded-full">
                        <LockKeyhole className="h-5 w-5" />
                    </div>
                    <div className="timeline-end mb-10 ">
                        <time className="font-mono italic">Feature 6</time>
                        <div className="text-lg font-bold">Secure Environment</div>
                        <p className="text-gray-600">
                        Study in a safe, authenticated online space.
                        </p>
                    </div>
                    <hr />
                </li>
            </ul>
        </div>
    );
};

export default FeatureSection;