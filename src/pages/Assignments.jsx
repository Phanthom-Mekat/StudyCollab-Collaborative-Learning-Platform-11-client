import  { useState, useEffect, useContext } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, TimerReset, Search, Book } from 'lucide-react';
import { AuthContext } from '@/provider/AuthProvider';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const Assignments = () => {
  const { user } = useContext(AuthContext);
  const initialAssignments = useLoaderData();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/create';

        if (search && difficulty && difficulty !== 'all') {
          url = `http://localhost:5000/create/search/difficulty/${difficulty}/${search}`;
        } else if (search) {
          url = `http://localhost:5000/create/search/${search}`;
        } else if (difficulty && difficulty !== 'all') {
          url = `http://localhost:5000/create/difficulty/${difficulty}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        toast.error('Failed to fetch assignments',error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchAssignments, 500);
    return () => clearTimeout(timer);
  }, [search, difficulty]);

  const handleUpdate = (id, email) => {
    if (email !== user?.email) {
      toast.error('You can only update your own assignments');
      return;
    }
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id, email) => {
    if (email !== user?.email) {
      toast.error('You can only delete your own assignments');
      return;
    }

    const result = await Swal.fire({
      title: 'Delete Assignment',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/create/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        
        if (data.deletedCount > 0) {
          setAssignments(prev => prev.filter(assignment => assignment._id !== id));
          toast.success('Assignment deleted successfully');
        }
      } catch (error) {
        toast.error('Failed to delete assignment',error);
      }
    }
  };

  return (
    <div className="min-h-screen p-10 md:p-8 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 mb-20">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary dark:text-white">Assignments</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse and manage your assignments</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-md-dark">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 dark:text-gray-300" />
              <Input
                type="text"
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
            </div>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full md:w-64 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Difficulty Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-72">
            <Loader2 className="animate-spin text-primary h-12 w-12" />
          </div>
        ) : assignments?.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <Book className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">No assignments found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments?.map((assignment) => (
              <Card key={assignment._id} className="group glass hover:shadow-xl transition-all duration-300 dark:bg-gray-800">
                <CardHeader className="p-0">
                  <img
                    src={assignment.thumbnailUrl}
                    alt={assignment.title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity dark:group-hover:opacity-70"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-1">
                    {assignment.title}
                  </CardTitle>
                  <div className="flex justify-between items-center mb-3">
                    <Badge className={`px-3 py-1 ${
                      assignment.difficultyLevel === 'easy' ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-900 dark:text-emerald-100' :
                      assignment.difficultyLevel === 'medium' ? 'bg-amber-100 text-amber-600 ring-1 ring-amber-600/20 dark:bg-amber-600 dark:text-amber-100' :
                      'bg-rose-100 text-rose-800 ring-1 ring-rose-600/20 dark:bg-rose-900 dark:text-rose-100'}  `}>
                      {assignment.difficultyLevel}
                    </Badge>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      Marks: {assignment.marks}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <TimerReset className="mr-2 h-4 w-4" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">{assignment.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 grid grid-cols-3 gap-2">
                  <Button variant="outline" asChild>
                    <Link to={`/assignments/${assignment._id}`}>View</Link>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleUpdate(assignment._id, assignment.email)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(assignment._id, assignment.email)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;