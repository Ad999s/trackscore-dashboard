
import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  ListChecks, 
  Megaphone, 
  DollarSign, 
  BarChart4, 
  ArrowUpCircle,
  CheckCircle2,
  CircleDashed
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Step {
  title: string;
  category: string;
  done: boolean;
  details: string;
}

interface GoalData {
  goal: string;
  timeframe: string;
  steps: Step[];
}

const Playground = () => {
  const [goalData, setGoalData] = useState<GoalData | null>(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Load saved goal data from localStorage
    const savedGoal = localStorage.getItem('playgroundGoal');
    if (savedGoal) {
      setGoalData(JSON.parse(savedGoal));
    }
  }, []);
  
  useEffect(() => {
    if (goalData) {
      // Calculate progress percentage based on completed steps
      const completedSteps = goalData.steps.filter(step => step.done).length;
      const totalSteps = goalData.steps.length;
      const calculatedProgress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
      setProgress(calculatedProgress);
    }
  }, [goalData]);
  
  const toggleStepCompletion = (index: number) => {
    if (!goalData) return;
    
    const updatedSteps = [...goalData.steps];
    updatedSteps[index].done = !updatedSteps[index].done;
    
    const updatedGoalData = {
      ...goalData,
      steps: updatedSteps
    };
    
    setGoalData(updatedGoalData);
    localStorage.setItem('playgroundGoal', JSON.stringify(updatedGoalData));
  };

  const getStepsByCategory = (category: string) => {
    if (!goalData) return [];
    return goalData.steps.filter(step => step.category === category);
  };

  if (!goalData) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto">
          <ListChecks className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-trackscore-text mb-2">No Active Goal</h2>
          <p className="text-gray-500 mb-6">
            You don't have any active implementation plan in the playground. 
            Go to the Ask AI section to create a new goal and implementation plan.
          </p>
          <Button onClick={() => window.location.href = '/ask-ai'}>
            Create a Goal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-trackscore-text">Implementation Playground</h1>
          <p className="text-slate-500 mt-1">
            Track your progress towards your business goals
          </p>
        </div>
      </div>
      
      <div className="mb-8 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold">{goalData.goal}</h2>
            <p className="text-slate-500">Target timeframe: {goalData.timeframe}</p>
          </div>
          <Badge variant="outline" className="bg-blue-50">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        
        <div className="mb-2">
          <span className="text-sm text-slate-500">Overall Progress</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/ask-ai'}>
            Update Goal
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            <span>Marketing</span>
          </TabsTrigger>
          <TabsTrigger value="cogs" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>COGS</span>
          </TabsTrigger>
          <TabsTrigger value="numbers" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            <span>Numbers</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <ArrowUpCircle className="h-4 w-4" />
            <span>Progress</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Business Overview</CardTitle>
              <CardDescription>
                Key strategic actions to achieve your goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getStepsByCategory('overview').map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg">
                    <button 
                      onClick={() => toggleStepCompletion(
                        goalData.steps.findIndex(s => s.title === step.title && s.category === step.category)
                      )}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {step.done ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <CircleDashed className="h-5 w-5 text-slate-300" />
                      )}
                    </button>
                    <div>
                      <h3 className={`font-medium ${step.done ? 'line-through text-slate-500' : ''}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{step.details}</p>
                    </div>
                  </div>
                ))}
                
                {getStepsByCategory('overview').length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No overview tasks have been assigned for this goal.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Actions</CardTitle>
              <CardDescription>
                Marketing campaigns and strategies to implement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getStepsByCategory('marketing').map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg">
                    <button 
                      onClick={() => toggleStepCompletion(
                        goalData.steps.findIndex(s => s.title === step.title && s.category === step.category)
                      )}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {step.done ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <CircleDashed className="h-5 w-5 text-slate-300" />
                      )}
                    </button>
                    <div>
                      <h3 className={`font-medium ${step.done ? 'line-through text-slate-500' : ''}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{step.details}</p>
                    </div>
                  </div>
                ))}
                
                {getStepsByCategory('marketing').length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No marketing tasks have been assigned for this goal.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cogs">
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization</CardTitle>
              <CardDescription>
                Actions to optimize costs and improve margins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getStepsByCategory('cogs').map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg">
                    <button 
                      onClick={() => toggleStepCompletion(
                        goalData.steps.findIndex(s => s.title === step.title && s.category === step.category)
                      )}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {step.done ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <CircleDashed className="h-5 w-5 text-slate-300" />
                      )}
                    </button>
                    <div>
                      <h3 className={`font-medium ${step.done ? 'line-through text-slate-500' : ''}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{step.details}</p>
                    </div>
                  </div>
                ))}
                
                {getStepsByCategory('cogs').length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No cost optimization tasks have been assigned for this goal.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="numbers">
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics & Analytics</CardTitle>
              <CardDescription>
                Numbers to track and analyze for your goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getStepsByCategory('numbers').map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg">
                    <button 
                      onClick={() => toggleStepCompletion(
                        goalData.steps.findIndex(s => s.title === step.title && s.category === step.category)
                      )}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {step.done ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <CircleDashed className="h-5 w-5 text-slate-300" />
                      )}
                    </button>
                    <div>
                      <h3 className={`font-medium ${step.done ? 'line-through text-slate-500' : ''}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{step.details}</p>
                    </div>
                  </div>
                ))}
                
                {getStepsByCategory('numbers').length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No metrics tracking tasks have been assigned for this goal.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Goal Progress Tracker</CardTitle>
              <CardDescription>
                Track your progress towards {goalData.goal}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Overall Completion</h3>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2.5" />
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Progress by Category</h3>
                  <div className="space-y-4">
                    {['overview', 'marketing', 'cogs', 'numbers'].map(category => {
                      const categorySteps = getStepsByCategory(category);
                      const completed = categorySteps.filter(step => step.done).length;
                      const total = categorySteps.length;
                      const categoryProgress = total > 0 ? (completed / total) * 100 : 0;
                      
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="capitalize text-sm">{category}</span>
                            <span className="text-xs">{completed}/{total} completed</span>
                          </div>
                          <Progress value={categoryProgress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Steps Remaining</h3>
                  <div className="space-y-2">
                    {goalData.steps.filter(step => !step.done).map((step, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                        <CircleDashed className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{step.title}</span>
                        <Badge variant="outline" className="ml-auto capitalize text-xs">
                          {step.category}
                        </Badge>
                      </div>
                    ))}
                    
                    {goalData.steps.filter(step => !step.done).length === 0 && (
                      <div className="text-center py-4 bg-green-50 rounded-lg text-green-600">
                        <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
                        <p>All steps completed! Great job!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/ask-ai'}
              >
                Request New Implementation Plan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Playground;
