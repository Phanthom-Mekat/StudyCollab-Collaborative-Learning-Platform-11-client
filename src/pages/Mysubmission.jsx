import { AuthContext } from "@/provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import {  FileText, Calendar, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// import axios from "axios";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const MySubmission = () => {
    const { user } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/submitAssignment/${user?.email}`)
            .then(res => res.data)
            .then(data => setSubmissions(data))
    }, [axiosSecure, user?.email]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="bg-white shadow-lg rounded-xl">
                <CardHeader className="border-b p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle className="text-2xl md:text-3xl font-bold text-primary">My Submissions</CardTitle>
                            <p className="text-gray-500 mt-1">Track your assignment progress</p>
                        </div>
                        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                            <Award className="text-primary w-5 h-5" />
                            <span className="font-semibold">{submissions.length} Submissions</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <div className="min-w-full divide-y divide-gray-200">
                            {submissions.map((submission) => (
                                <div key={submission._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                        {/* Assignment Info */}
                                        <div className="md:col-span-5">
                                            <div className="flex gap-4">
                                                <div className="relative flex-shrink-0">
                                                    <img 
                                                        src={submission.imageUrl || "/api/placeholder/100/100"} 
                                                        alt={submission.title}
                                                        className="w-20 h-20 rounded-lg object-cover shadow-md"
                                                    />
                                                    <div className="absolute -top-2 -right-2 bg-green-500    text-white text-xs px-2 py-1 rounded-full font-medium">
                                                        {submission.marks} marks
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">
                                                        {submission.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-3 text-sm">
                                                        <div className="flex items-center text-gray-500">
                                                            <Calendar className="w-4 h-4 mr-1.5" />
                                                            {formatDate(submission.submissionDate)}
                                                        </div>
                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                                                            ${submission.status === 'completed' 
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'}`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                                                submission.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
                                                            }`} />
                                                            {submission.status}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="md:col-span-3">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="font-medium text-gray-700">Progress</span>
                                                    <span className="text-gray-500">
                                                        {submission.obtainedMarks || '0'}/{submission.marks}
                                                    </span>
                                                </div>
                                                <Progress 
                                                    value={(submission.obtainedMarks || 0) / submission.marks * 100}
                                                    className="h-2 bg-gray-100"
                                                />
                                                <div className="text-xs text-gray-500 text-right">
                                                    {((submission.obtainedMarks || 0) / submission.marks * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>

                                        {/* Feedback */}
                                        <div className="md:col-span-4">
                                            {submission.feedback ? (
                                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                                                        <FileText className="w-4 h-4 text-primary" />
                                                        Examiner Feedback
                                                    </div>
                                                    <p className="text-sm text-gray-600 line-clamp-3">{submission.feedback}</p>
                                                </div>
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">
                                                    Awaiting feedback
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MySubmission;