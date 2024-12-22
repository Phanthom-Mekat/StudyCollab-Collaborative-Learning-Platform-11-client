import  { useState, useContext } from 'react'
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
        body: JSON.stringify(assignmentData),
      })

      if (response.ok) {
        toast.success('Assignment created successfully!')
        // Reset form
        e.target.reset()
        setDifficultyLevel('')
        setDueDate(new Date())
      } else {
        toast.error('Failed to create assignment')
      }
    } catch (error) {
      console.error('Error creating assignment:', error)
      toast.error('An error occurred while creating the assignment')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-6 h-6" />
          Create New Assignment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <Input
                id="title"
                name="title"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marks">Marks</Label>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-muted-foreground" />
              <Input
                id="marks"
                name="marks"
                type="number"
                required
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
            <div className="flex items-center space-x-2">
              <Image className="w-5 h-5 text-muted-foreground" />
              <Input
                id="thumbnailUrl"
                name="thumbnailUrl"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficultyLevel">Difficulty Level</Label>
            <Select onValueChange={setDifficultyLevel} required>
              <SelectTrigger>
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
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Assignment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateAssignment

