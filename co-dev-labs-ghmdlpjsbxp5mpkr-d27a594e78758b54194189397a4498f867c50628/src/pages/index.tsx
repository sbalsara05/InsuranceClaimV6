import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircle, FileText, Clock, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const questions = [
  "Was anyone injured in the fire?",
  "Were fire alarms activated during the incident?",
  "Was the fire department called to the scene?",
  "Did you attempt to extinguish the fire yourself?",
  "Were there any explosions during the fire?",
  "Did the fire spread to neighboring properties?",
  "Were any pets affected by the fire?",
  "Was the property occupied at the time of the fire?",
  "Do you have photos of the damage?",
  "Was there any electrical malfunction before the fire?",
  "Are there any visible signs of arson?",
  "Did you secure the property after the fire?",
  "Was there any renovation work ongoing before the fire?",
  "Were any hazardous materials stored in the affected area?",
  "Did you maintain smoke detectors in the property?",
  "Is the property currently habitable?",
  "Do you have a temporary place to stay?",
  "Were any important documents destroyed?",
  "Did you create an inventory of damaged items?",
  "Have you contacted your insurance agent already?"
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    incidentDate: new Date(),
    answers: new Array(questions.length).fill("")
  });

  const handleInputChange = (field: string, value: any) => {
    if (field === "answer") {
      const newAnswers = [...formData.answers];
      newAnswers[currentQuestion] = value;
      setFormData(prev => ({
        ...prev,
        answers: newAnswers
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log({
      incidentDate: formData.incidentDate,
      answers: formData.answers.map((answer, index) => ({
        question: questions[index],
        answer
      }))
    });
    setOpen(false);
    setCurrentQuestion(0);
    setFormData({
      incidentDate: new Date(),
      answers: new Array(questions.length).fill("")
    });
  };

  const renderQuestion = () => {
    if (currentQuestion === -1) {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>When did the incident occur?</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.incidentDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.incidentDate ? (
                    format(formData.incidentDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.incidentDate}
                  onSelect={(date) => handleInputChange("incidentDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-lg font-medium">{questions[currentQuestion]}</Label>
          <RadioGroup
            value={formData.answers[currentQuestion]}
            onValueChange={(value) => handleInputChange("answer", value)}
            className="mt-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="text-base">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="text-base">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Fire Insurance Claims Service</title>
        <meta name="description" content="Fire Insurance Claims Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6 container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add New Claim */}
            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PlusCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Add New Claim</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Start a new insurance claim process for fire-related incidents.</p>
                <Button className="w-full" onClick={() => {
                  setOpen(true);
                  setCurrentQuestion(-1);
                }}>Create New Claim</Button>
              </CardContent>
            </Card>

            {/* Manage Documents */}
            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Manage Documents</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Upload and organize documents related to your claims.</p>
                <Button variant="outline" className="w-full">View Documents</Button>
              </CardContent>
            </Card>

            {/* Recent Claims */}
            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Recent Claims</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-muted-foreground">No recent claims to display.</p>
                  <Button variant="outline" className="w-full">View All Claims</Button>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Management */}
            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Inventory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Track and manage affected items in your claims.</p>
                <Button variant="outline" className="w-full">Manage Inventory</Button>
              </CardContent>
            </Card>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[800px] w-full">
              <DialogHeader>
                <DialogTitle>
                  {currentQuestion === -1 
                    ? "New Insurance Claim - Incident Date" 
                    : `Question ${currentQuestion + 1} of ${questions.length}`}
                </DialogTitle>
                <DialogDescription>
                  Please provide accurate information about the incident.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                {renderQuestion()}
              </div>

              <DialogFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  disabled={currentQuestion === -1}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (currentQuestion === -1 && !formData.incidentDate) {
                      return; // Don't proceed if date is not selected
                    }
                    if (currentQuestion === questions.length - 1) {
                      handleSubmit();
                    } else {
                      setCurrentQuestion((prev) => prev + 1);
                    }
                  }}
                  disabled={currentQuestion >= 0 && !formData.answers[currentQuestion]}
                >
                  {currentQuestion === questions.length - 1 ? "Submit Claim" : "Next"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </>
  );
}