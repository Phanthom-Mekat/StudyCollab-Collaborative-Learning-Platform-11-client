import { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
    Calendar,
    Trophy,
    BarChart3,
    User,
    Mail,
    Link as LinkIcon,
    FileText
} from 'lucide-react';
import { AuthContext } from "../provider/AuthProvider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

const AssignmentDetails = () => {
    const assignment = useLoaderData();
    const { user } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        googleDocsLink: '',
        quickNote: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submissionData = {
            ...formData,
            assignmentId: assignment._id,
            title: assignment.title,
            imageUrl: assignment.thumbnailUrl,
            marks: assignment.marks,
            userEmail: user.email,
            userName: user.displayName,
            submissionDate: new Date().toISOString(),
            status: 'pending'
        };

        try {
            const response = await fetch('http://localhost:5000/submitAssignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(submissionData),
            });
            if (!response.ok) {
                throw new Error('Failed to submit assignment');
            }
            toast.success('Assignment submitted successfully!');

            setFormData({
                googleDocsLink: '',
                quickNote: ''
            });
            setOpen(false);
            navigate('/assignments');

        } catch (error) {
            toast.error('Failed to submit assignment. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getDifficultyColor = (level) => {
        switch (level.toLowerCase()) {
            case 'easy':
                return 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20';
            case 'medium':
                return 'bg-amber-100 text-amber-800 ring-1 ring-amber-600/20';
            default:
                return 'bg-rose-100 text-rose-800 ring-1 ring-rose-600/20';
        }
    };

    return (
        <div className="container  mx-auto px-4 py-8 ">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header Section */}
                <div className="md:flex justify-between gap-4 mb-8">
                    <div className="relative mb-8 rounded-xl overflow-hidden ">
                        <img
                            src={assignment.thumbnailUrl || "/api/placeholder/800/400"}
                            alt={assignment.title}
                            className="object-cover h-96 transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute top-4 right-4">
                            <span className={`
                            px-4 py-2 rounded-full text-sm font-semibold shadow-sm
                            ${getDifficultyColor(assignment.difficultyLevel)}
                        `}>
                                {assignment.difficultyLevel}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <Card className="p-8 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-neutral-900">
                        <h1 className="text-4xl font-bold mb-6">{assignment.title}</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                                <Trophy className="w-6 h-6 text-primary" />
                                <span className="text-lg font-medium">{assignment.marks} Marks</span>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                                <Calendar className="w-6 h-6 text-purple-500" />
                                <span className="text-lg font-medium">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                                <BarChart3 className="w-6 h-6 text-primary" />
                                <span className="text-lg font-medium">{assignment.difficultyLevel} Level</span>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                                <User className="w-6 h-6 text-purple-500" />
                                <span className="text-lg font-medium">{assignment.name}</span>
                            </div>
                        </div>

                        <div className="prose max-w-none mb-8 dark:text-neutral-200">
                            <h2 className="text-2xl font-semibold mb-4 ">Description</h2>
                            <p className="text-gray-700 dark:text-neutral-400 leading-relaxed">{assignment.description}</p>
                        </div>

                        {/* Submit Assignment Dialog */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <button className="w-full px-6 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                    Take Assignment
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] dark:bg-neutral-800">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-primary">Submit Assignment</DialogTitle>
                                    <DialogDescription className="text-gray-600 dark:text-neutral-300">
                                        Submit your completed assignment here. Please ensure you have followed all instructions.
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium flex items-center gap-2 text-primary">
                                            <LinkIcon className="w-4 h-4" />
                                            Google Docs Link
                                        </label>
                                        <input
                                            type="url"
                                            required
                                            placeholder="Paste your Google Docs link here"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                            value={formData.googleDocsLink}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                googleDocsLink: e.target.value
                                            })}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-medium flex items-center gap-2 text-primary">
                                            <FileText className="w-4 h-4" />
                                            Quick Note
                                        </label>
                                        <textarea
                                            required
                                            placeholder="Add any notes for your submission..."
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-24"
                                            value={formData.quickNote}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                quickNote: e.target.value
                                            })}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                                    </button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </div>

                {/* Created By Section */}
                <Card className="p-6 glass shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-neutral-900">
                    <h3 className="text-xl font-semibold mb-6 text-primary">Created By</h3>
                    <div className="flex items-center gap-6">
                        <div className="avatar">
                            <div className="w-16 h-16 rounded-full ring-2 ring-primary/20">
                                <img src={user?.photoURL || "/api/placeholder/100/100"} alt="Creator" className="object-cover" />
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-lg text-gray-800 dark:text-neutral-100">{assignment.name}</p>
                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1 dark:text-neutral-100">
                                <Mail className="w-4 h-4 text-primary" />
                                {assignment.email}
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>

    );
};

export default AssignmentDetails;