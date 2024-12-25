import { useState, useContext } from 'react'
import DatePicker from 'react-datepicker'
import { ClipboardList, Image, CalendarIcon, BookOpen, Trophy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import "react-datepicker/dist/react-datepicker.css"
import "react-toastify/dist/ReactToastify.css"
import { AuthContext } from '@/provider/AuthProvider'
import toast from 'react-hot-toast'

const CreateAssignment = () => {
  const [dueDate, setDueDate] = useState(new Date())
  const [difficultyLevel, setDifficultyLevel] = useState('')
  const { user } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const assignmentData = {
        title: e.target.title.value,
        description: e.target.description.value,
        marks: parseInt(e.target.marks.value),
        thumbnailUrl: e.target.thumbnailUrl.value,
        difficultyLevel: difficultyLevel,
        dueDate: dueDate,
        email: user.email,
        name: user.displayName
      }
      const response = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(assignmentData),
      })

      if (response.ok) {
        toast.success('Assignment created successfully!')
        e.target.reset()
        setDifficultyLevel('')
        setDueDate(new Date())
      } else {
        toast.error('Failed to create assignment')
      }
    } catch (error) {
      console.error('Error creating assignment:', error)
      toast.error('An error occurred while creating the assignment',error)
    }
  }

  return (
    <div className="min-h-screen bg-accent dark:bg-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-primary dark:bg-primary-dark text-white p-6">
          <CardTitle className="flex items-center h-font text-center gap-2 text-2xl font-bold">
            <ClipboardList className="w-8 h-8" />
            Create New Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</Label>
              <div className="flex items-center space-x-2 y rounded-md p-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <Input
                  id="title"
                  name="title"
                  required
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter assignment title"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                className="w-full b rounded-md p-2 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter assignment description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks" className="text-sm font-medium text-gray-700 dark:text-gray-300">Marks</Label>
              <div className="flex items-center space-x-2  rounded-md p-2">
                <Trophy className="w-5 h-5 text-primary" />
                <Input
                  id="marks"
                  name="marks"
                  type="number"
                  required
                  min="0"
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter total marks"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl" className="text-sm font-medium text-gray-700 dark:text-gray-300">Thumbnail Image URL</Label>
              <div className="flex items-center space-x-2  rounded-md p-2">
                <Image className="w-5 h-5 text-primary" />
                <Input
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  required
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter thumbnail URL"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficultyLevel" className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty Level</Label>
              <Select onValueChange={setDifficultyLevel} required>
                <SelectTrigger className="w-full  text-gray-900 dark:text-gray-300">
                  <SelectValue placeholder="Select Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</Label>
              <div className="flex items-center space-x-2 rounded-md p-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary dark:bg-primary-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90 text-white font-bold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
              Create Assignment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateAssignment

