import { useState, useEffect, useContext } from 'react';
import { FaTrophy, FaMedal, FaFire, FaStar, FaCheckCircle, FaGraduationCap, FaCrown } from 'react-icons/fa';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { AuthContext } from '@/provider/AuthProvider';

const GamificationDashboard = () => {
    const [stats, setStats] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [monthlyLeaderboard, setMonthlyLeaderboard] = useState([]);
    const [showGuide, setShowGuide] = useState(true);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, leaderboardRes, monthlyRes] = await Promise.all([
                    axiosSecure.get(`/userStats/${user.email}`),
                    axiosSecure.get('/leaderboard'),
                    axiosSecure.get('/monthlyLeaderboard')
                ]);
                setStats(statsRes.data);
                setLeaderboard(leaderboardRes.data);
                setMonthlyLeaderboard(monthlyRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [axiosSecure, user.email]);

    const getBadgeColor = (points) => {
        if (points >= 1000) return 'bg-gradient-to-r from-purple-600 to-purple-800';
        if (points >= 500) return 'bg-gradient-to-r from-blue-600 to-blue-800';
        return 'bg-gradient-to-r from-green-600 to-green-800';
    };


    const pointGuide = [
        { action: 'Graded Assignment', points: '10 points', icon: '📝' },
        { action: 'Grade an Assignment', points: '5 points', icon: '✅' },
        { action: 'Get Perfect Score', points: '15 points', icon: '⭐' },
        { action: '7-Day Streak', points: '20 points', icon: '🔥' },
        { action: 'Monthly Top Position', points: '50 points', icon: '🏆' },
        { action: 'First Submission', points: '50 points', icon: '🎯' },
        { action: 'Perfect Week Streak', points: '100 points', icon: '⚡' },
        { action: 'Grade 10 Assignments', points: '75 points', icon: '🎓' },
        { action: 'Top Monthly Performer', points: '200 points', icon: '👑' }
    ];

    if (!stats) return <div className="flex justify-center p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-200  ">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 dark:text-white ">
                <FaCrown className="text-yellow-500" />
                How to Earn Points
            </h2>
            <div className="space-y-3">
                {pointGuide.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm  ">
                        <span className="text-gray-700 dark:text-gray-400    ">{item.action}</span>
                        <span className="font-semibold text-green-600">{item.points}</span>
                    </div>
                ))}
            </div>
        </div></div>;


    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 mb-10">
            {showGuide && !stats?.assignmentsCompleted && (
                <Alert className="bg-blue-50 border-blue-200 dark:bg-gray-700 dark:border-gray-600">
                    <FaGraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="ml-2 dark:text-white">
                        <h3 className="font-semibold text-lg mb-2">Welcome to StudyColab Points System! 🎉</h3>
                        <p className="mb-2">Start earning points and climb the leaderboard by participating in our learning community:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Submit assignments to earn points</li>
                            <li>Help others by grading assignments</li>
                            <li>Maintain daily activity streaks</li>
                            <li>Aim for perfect scores</li>
                        </ul>
                        <button
                            onClick={() => setShowGuide(false)}
                            className="mt-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
                        >
                            Got it!
                        </button>
                    </AlertDescription>
                </Alert>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: FaTrophy, value: stats.points, label: 'Total Points', color: 'yellow' },
                    { icon: FaStar, value: stats.monthlyPoints, label: 'Monthly Points', color: 'yellow' },
                    { icon: FaFire, value: stats.currentStreak, label: 'Day Streak', color: 'red' },
                    { icon: FaMedal, value: `#${leaderboard.findIndex(p => p.userEmail === user.email) + 1 || '-'}`, label: 'Global Rank', color: 'blue' }
                ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 transform hover:scale-105 transition-transform duration-300">
                        <item.icon className={`text-4xl text-${item.color}-500 mb-2`} />
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{item.value}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Point Guide */}
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-600">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                        <FaCrown className="text-yellow-500 animate-pulse" />
                        How to Earn Points
                    </h2>
                    <div className="space-y-3">
                        {pointGuide.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors duration-200">
                                <span className="flex items-center gap-2">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-gray-700 dark:text-gray-300">{item.action}</span>
                                </span>
                                <span className="font-semibold text-green-600 dark:text-green-400">{item.points}</span>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Achievements */}
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-600 lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
                        <FaTrophy className="text-yellow-500 animate-spin-slow" />
                        Your Achievements
                    </h2>
                    {stats.achievements?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stats.achievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={`${getBadgeColor(achievement.points)} p-4 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{achievement.icon}</span>
                                        <h3 className="font-bold text-white">{achievement.name}</h3>
                                    </div>
                                    <p className="text-sm mt-2 text-gray-100">{achievement.description}</p>
                                    <p className="text-sm mt-2 font-bold text-white">+{achievement.points} points</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <FaCheckCircle className="mx-auto text-5xl mb-3 text-gray-400 dark:text-gray-500 animate-bounce" />
                            <p className="text-gray-600 dark:text-gray-300 font-medium">Complete tasks to unlock achievements!</p>
                            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Submit assignments, grade peers, and maintain streaks.</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Leaderboards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* All-Time Leaderboard */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">All-Time Top Students</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-2 text-gray-600 dark:text-gray-300">Rank</th>
                                    <th className="text-left p-2 text-gray-600 dark:text-gray-300">Name</th>
                                    <th className="text-right p-2 text-gray-600 dark:text-gray-300">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((player, index) => (
                                    <tr
                                        key={player._id}
                                        className={`${player.userEmail === user.email ? 'bg-blue-50 dark:bg-gray-700' : ''}`}
                                    >
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{player.userName}</td>
                                        <td className="text-right p-2">{player.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Monthly Leaderboard */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Monthly Rankings</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-2 text-gray-600 dark:text-gray-300">Rank</th>
                                    <th className="text-left p-2 text-gray-600 dark:text-gray-300">Name</th>
                                    <th className="text-right p-2 text-gray-600 dark:text-gray-300">Monthly Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyLeaderboard.map((player, index) => (
                                    <tr
                                        key={player._id}
                                        className={`${player.userEmail === user.email ? 'bg-blue-50 dark:bg-gray-700' : ''}`}
                                    >
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{player.userName}</td>
                                        <td className="text-right p-2">{player.monthlyPoints}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default GamificationDashboard;