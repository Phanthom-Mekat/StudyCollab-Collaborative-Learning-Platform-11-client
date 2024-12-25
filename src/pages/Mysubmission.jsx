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
    if (submissions.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                    <CardHeader className="border-b p-6 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <CardTitle className="text-2xl md:text-3xl font-bold text-primary dark:text-primary">My Submissions</CardTitle>
                                <p className="text-gray-500 mt-1 dark:text-gray-300">Track your assignment progress</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-gray-500 text-center">No submissions found.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
            <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                <CardHeader className="border-b p-6 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle className="text-2xl md:text-3xl font-bold text-primary dark:text-primary">My Submissions</CardTitle>
                            <p className="text-gray-500 mt-1 dark:text-gray-300">Track your assignment progress</p>
                        </div>
                        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg dark:bg-primary/20 dark:text-white">
                            <Award className="text-primary w-5 h-5 dark:text-primary" />
                            <span className="font-semibold">{submissions.length} Submissions</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            {submissions.map((submission) => (
                                <div key={submission._id} className="p-6 hover:bg-gray-50 transition-colors dark:hover:bg-gray-600">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                        {/* Assignment Info */}
                                        <div className="md:col-span-5">
                                            <div className="flex gap-4">
                                                <div className="relative flex-shrink-0">
                                                    <img 
                                                        src={submission.imageUrl || "/api/placeholder/100/100"} 
                                                        alt={submission.title}
                                                        className="w-20 h-20 rounded-lg object-cover shadow-md dark:shadow-gray-800"
                                                    />
                                                    <div className="absolute -top-2 -right-2 bg-green-500 dark:bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                        {submission.marks} marks
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1">
                                                        {submission.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-300">
                                                        <div className="flex items-center text-gray-500 dark:text-gray-300">
                                                            <Calendar className="w-4 h-4 mr-1.5 dark:text-white" />
                                                            {formatDate(submission.submissionDate)}
                                                        </div>
                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                                                            ${submission.status === 'completed' 
                                                                ? 'bg-green-100 dark:bg-green-300 text-green-800 dark:text-green-800'
                                                                : 'bg-yellow-100 dark:bg-yellow-300 text-yellow-800 dark:text-yellow-800'}`}>
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
                                                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                                                    <span className="font-medium text-gray-700 dark:text-white">Progress</span>
                                                    <span className="text-gray-500 dark:text-gray-300">
                                                        {submission.obtainedMarks || '0'}/{submission.marks}
                                                    </span>
                                                </div>
                                                <Progress 
                                                    value={(submission.obtainedMarks || 0) / submission.marks * 100}
                                                    className="h-2 bg-gray-100 dark:bg-gray-700"
                                                />
                                                <div className="text-xs text-gray-500 dark:text-gray-300 text-right">
                                                    {((submission.obtainedMarks || 0) / submission.marks * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>

                                        {/* Feedback */}
                                        <div className="md:col-span-4">
                                            {submission.feedback ? (
                                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                                    <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-white">
                                                        <FileText className="w-4 h-4 text-primary dark:text-primary" />
                                                        Examiner Feedback
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{submission.feedback}</p>
                                                </div>
                                            ) : (
                                                <div className="h-full flex items-center justify-center text-sm text-gray-400 dark:text-gray-500 italic">
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