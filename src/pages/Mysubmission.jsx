import { AuthContext } from "@/provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Clock,  FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MySubmission = () => {
    const { user } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5000/submitAssignment/${user?.email}`)
            .then(res => res.json())
            .then(data => setSubmissions(data))
    }, [user?.email]);

    return (
        <Card className="w-full max-w-6xl mx-auto mt-8">
            <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">My Submissions</CardTitle>
                    <div className="text-sm text-gray-500">
                        Total Submissions: {submissions.length}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Assignment</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Progress</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Feedback</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {submissions.map((submission) => (
                                <tr key={submission._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img 
                                                    src={submission.imageUrl || "/api/placeholder/100/100"} 
                                                    alt={submission.title}
                                                    className="w-16 h-16 rounded-lg object-cover shadow-sm"
                                                />
                                                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                                    {submission.marks} pts
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-lg">{submission.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(submission.submissionDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                                            ${submission.status === 'completed' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            <div className={`w-2 h-2 rounded-full ${
                                                submission.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
                                            }`} />
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 w-64">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="font-medium text-gray-700">
                                                    {submission.obtainedMarks || '0'} / {submission.marks}
                                                </span>
                                                <span className="text-gray-500">
                                                    {((submission.obtainedMarks || 0) / submission.marks * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                            <Progress 
                                                
                                                value={(submission.obtainedMarks || 0) / submission.marks * 100} 
                                                className="h-2  rounded-lg"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs">
                                            {submission.feedback ? (
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                                                        <FileText className="w-4 h-4" />
                                                        Examiner Feedback
                                                    </div>
                                                    <p className="text-sm text-gray-600">{submission.feedback}</p>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-400 italic">Awaiting feedback</p>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default MySubmission;