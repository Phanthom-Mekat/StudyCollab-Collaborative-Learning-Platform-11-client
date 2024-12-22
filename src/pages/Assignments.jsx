import { useState, useEffect, useContext } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, TimerReset } from 'lucide-react'
import Swal from 'sweetalert2'
import { AuthContext } from '@/provider/AuthProvider'
import toast from 'react-hot-toast'


const Assignments = () => {
  const { user } = useContext(AuthContext);
  const initialAssignments = useLoaderData();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAssignments(initialAssignments);
  }, [initialAssignments]);

  const handleDelete = (id, email) => {
    if (email !== user.email) {
      toast.error('You cant delete this assignment🤡');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/create/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const updatedAssignments = assignments.filter(
                (assignment) => assignment._id !== id
              );
              setAssignments(updatedAssignments);
              Swal.fire(
                'Deleted!',
                'Your assignment has been deleted.',
                'success'
              );
            }
          })
          .catch((error) =>
            console.error('Failed to delete assignment:', error)
          );
      }
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (assignments?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-accent">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-10">
            <p className="text-xl font-semibold text-gray-700">
              No assignments found
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">All Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments?.map((assignment) => (
          <Card key={assignment._id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <img 
                src={assignment.thumbnailUrl} 
                alt={assignment.title} 
                className="w-full h-72 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-bold mb-2 text-primary">{assignment.title}</CardTitle>
              <div className="flex justify-between items-center mb-2">
                <Badge className={`${getDifficultyColor(assignment.difficultyLevel)} text-white`}>
                  {assignment.difficultyLevel}
                </Badge>
                <span className="font-semibold text-gray-700">Marks: {assignment.marks}</span>
              </div>
              <div className='text-[12px] text-gray-700 mb-2'>
                <p>
                  <TimerReset className="mr-1 h-5 w-5 inline item-center text-primary"/>
                Deadline:
                  {new Date(assignment.dueDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-700 line-clamp-2">
                
                📝{assignment.description}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" className="flex-1 mr-2">
                <Link to={`/assignments/${assignment._id}`} className="block w-full text-center">
                  View
                </Link>
              </Button>
              <Button variant="outline" className="flex-1 mr-2">Update</Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={() => handleDelete(assignment._id,assignment.email)}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Delete'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Assignments

