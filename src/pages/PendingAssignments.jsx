import { useState, useContext, useEffect } from 'react';
// import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Clock, Award, User } from 'lucide-react';
// import axios from 'axios';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const PendingAssignments = () => {
    const [pendingSubmissions, setPendingSubmissions] = useState([]);
    const { user } = useContext(AuthContext);
    const [isMarkingModalOpen, setIsMarkingModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [markingForm, setMarkingForm] = useState({
        marks: '',
        feedback: ''
    });
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const fetchPendingSubmissions = async () => {
            try {
                const response = await axiosSecure.get('/submitAssignment');
                setPendingSubmissions(response.data.filter(submission => 
                    submission.status === 'pending'
                ));
            } catch (error) {
                toast.error('Failed to fetch pending submissions',error);
            }
        };

        fetchPendingSubmissions();
    }, [axiosSecure]);

    const handleGiveMark = (submission) => {
        if (submission.userEmail === user?.email) {
            toast.error("You cannot mark your own assignment!");
            return;
        }
        setSelectedSubmission(submission);
        setIsMarkingModalOpen(true);
        setMarkingForm({ marks: '', feedback: '' });
    };

    const handleMarkSubmit = async (e) => {
        e.preventDefault();
        
        if (Number(markingForm.marks) > selectedSubmission.marks) {
            toast.error(`Marks cannot exceed maximum marks (${selectedSubmission.marks})`);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/submitAssignment/${selectedSubmission._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    obtainedMarks: markingForm.marks,
                    feedback: markingForm.feedback,
                    status: 'completed',
                    examinerEmail: user.email,
                    examinerName: user.displayName
                }),
            });

            if (!response.ok) throw new Error('Failed to submit marks');

            toast.success('Assignment marked successfully!');
            setIsMarkingModalOpen(false);
            
            setPendingSubmissions(
                pendingSubmissions.filter((s) => s._id !== selectedSubmission._id)
            );

        } catch (error) {
            toast.error('Failed to submit marks. Please try again.');
            console.error('Marking error:', error);
        }
    };

    if (pendingSubmissions.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-primary mb-8">Pending Assignments</h1>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <p className="text-gray-600">No pending assignments to mark.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-10 pb-20">
            <h1 className="text-3xl font-bold text-primary mb-8">Pending Assignments</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Assignment</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Examinee</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Submission Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total Marks</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pendingSubmissions.map((submission) => (
                                <tr key={submission._id} className={`
                                    hover:bg-gray-50 transition-colors
                                    ${submission.userEmail === user?.email ? 'bg-gray-50' : ''}
                                `}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={submission.imageUrl || "/api/placeholder/100/100"} 
                                                alt={submission.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{submission.title}</h3>
                                                <p className="text-sm text-gray-500">ID: {submission.assignmentId.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="font-medium text-gray-900">{submission.userName}</p>
                                                <p className="text-sm text-gray-500">{submission.userEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">
                                                {new Date(submission.submissionDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Award className="w-4 h-4 text-primary" />
                                            <span className="font-medium text-gray-900">{submission.marks}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleGiveMark(submission)}
                                            className={`
                                                px-4 py-2 text-sm font-medium rounded-lg transition-colors
                                                ${submission.userEmail === user?.email 
                                                    ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                                                    : 'bg-primary text-white hover:bg-primary/90'}
                                            `}
                                        >
                                            Give Mark
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Marking Modal */}
            <Dialog open={isMarkingModalOpen} onOpenChange={setIsMarkingModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary">
                            Mark Assignment
                        </DialogTitle>
                    </DialogHeader>

                    {selectedSubmission && (
                        <div className="mt-4">
                            <div className="mb-6 space-y-2">
                                <h3 className="font-semibold text-gray-900">{selectedSubmission.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="w-4 h-4" />
                                    <span>Submitted by {selectedSubmission.userName}</span>
                                </div>
                            </div>

                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium mb-2">Submission Details</h4>
                                <a 
                                    href={selectedSubmission.googleDocsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-primary hover:underline mb-3"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View Submission
                                </a>
                                <p className="text-sm text-gray-600">{selectedSubmission.quickNote}</p>
                            </div>

                            <form onSubmit={handleMarkSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Marks (Max: {selectedSubmission.marks})
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        max={selectedSubmission.marks}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={markingForm.marks}
                                        onChange={(e) => setMarkingForm({...markingForm, marks: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Feedback
                                    </label>
                                    <textarea
                                        required
                                        rows="4"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={markingForm.feedback}
                                        onChange={(e) => setMarkingForm({...markingForm, feedback: e.target.value})}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Submit Marks
                                </button>
                            </form>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PendingAssignments;