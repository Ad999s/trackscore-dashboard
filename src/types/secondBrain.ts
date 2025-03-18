
export type InsightCategory = {
  id: string;
  title: string;
  icon: string;
  description: string;
  insights: Insight[];
};

export type Insight = {
  id: string;
  title: string;
  description: string[];
  potentialImpact: 'high' | 'medium' | 'low';
};

export type Suggestion = {
  id: string;
  title: string;
  description: string;
  actionItems: string[];
  category: string;
  impact: 'high' | 'medium' | 'low';
};

export type QuestionType = {
  id: string;
  title: string;
  description: string;
  examples: string[];
  category: string;
  icon: string;
};
