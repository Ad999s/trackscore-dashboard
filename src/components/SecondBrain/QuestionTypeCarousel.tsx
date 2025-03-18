
import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuestionType } from '@/types/secondBrain';
import { 
  BadgeDollarSign, 
  Package, 
  Users, 
  TrendingUp, 
  Truck, 
  Heart, 
  BarChart3 
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

interface QuestionTypeCarouselProps {
  questionTypes: QuestionType[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  autoAdvance: boolean;
}

const QuestionTypeCarousel = ({ 
  questionTypes, 
  currentIndex, 
  onIndexChange,
  autoAdvance
}: QuestionTypeCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoAdvance && carouselRef.current) {
      const scrollContainer = carouselRef.current.querySelector('.carousel-scroll');
      if (scrollContainer) {
        const itemWidth = scrollContainer.children[0]?.clientWidth || 0;
        scrollContainer.scrollTo({
          left: itemWidth * currentIndex,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex, autoAdvance]);
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'BadgeDollarSign': return <BadgeDollarSign className="w-5 h-5" />;
      case 'Package': return <Package className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div ref={carouselRef} className="relative">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="carousel-scroll">
          {questionTypes.map((question, index) => (
            <CarouselItem 
              key={question.id} 
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div 
                className={cn(
                  "h-full rounded-xl p-6 transition-all duration-300",
                  index === currentIndex 
                    ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200" 
                    : "bg-slate-50 border border-slate-200"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "rounded-full p-2",
                    index === currentIndex 
                      ? "bg-blue-100 text-blue-600" 
                      : "bg-slate-200 text-slate-700"
                  )}>
                    {getIconComponent(question.icon)}
                  </div>
                  <h3 className="font-medium">{question.title}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">{question.description}</p>
                <div className="space-y-2">
                  {question.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-blue-500 text-lg leading-tight">•</span>
                      <p className="text-xs text-slate-600">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          onClick={() => onIndexChange(currentIndex === 0 ? questionTypes.length - 1 : currentIndex - 1)}
          className="bg-white"
        />
        <CarouselNext 
          onClick={() => onIndexChange(currentIndex === questionTypes.length - 1 ? 0 : currentIndex + 1)}
          className="bg-white"
        />
      </Carousel>
      
      <div className="flex justify-center mt-4 gap-1">
        {questionTypes.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`h-2 w-${index === currentIndex ? '4' : '2'} rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-500' : 'bg-slate-300'
            }`}
            aria-label={`Go to question ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionTypeCarousel;
