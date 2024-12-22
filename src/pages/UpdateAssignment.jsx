import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClipboardList, Image, CalendarIcon, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const UpdateAssignment = () => {
  const loadedAssignment = useLoaderData();
  const navigate = useNavigate();

  const [title, setTitle] = useState(loadedAssignment.title || "");
  const [description, setDescription] = useState(loadedAssignment.description || "");
  const [marks, setMarks] = useState(loadedAssignment.marks || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(loadedAssignment.thumbnailUrl || "");
  const [difficultyLevel, setDifficultyLevel] = useState(loadedAssignment.difficultyLevel || "");
  const [dueDate, setDueDate] = useState(loadedAssignment.dueDate ? new Date(loadedAssignment.dueDate) : new Date());
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAssignment = {
        title,
        description,
        marks: parseInt(marks),
        thumbnailUrl,
        difficultyLevel,
        dueDate,
      };

      const response = await fetch(`http://localhost:5000/create/${loadedAssignment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAssignment),
      });

      if (response.ok) {
        toast.success("Assignment updated successfully!");
        navigate("/assignments"); // Optional redirect
      } else {
        toast.error("Failed to update assignment");
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
      toast.error("An error occurred while updating the assignment");
    }
  };

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-primary text-white p-6">
          <CardTitle className="flex items-center h-font text-center gap-2 text-2xl font-bold">
            <ClipboardList className="w-8 h-8" />
            Update Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <div className="flex items-center space-x-2 y rounded-md p-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="w-full b rounded-md p-2 text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <div className="flex items-center space-x-2 rounded-md p-2">
                <Trophy className="w-5 h-5 text-primary" />
                <Input
                  id="marks"
                  type="number"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  min="0"
                  required
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
              <div className="flex items-center space-x-2 rounded-md p-2">
                <Image className="w-5 h-5 text-primary" />
                <Input
                  id="thumbnailUrl"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  required
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficultyLevel">Difficulty Level</Label>
              <Select
                value={difficultyLevel}
                onValueChange={setDifficultyLevel}
                required
              >
                <SelectTrigger className="w-full  text-gray-900">
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
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
              Update Assignment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateAssignment;
