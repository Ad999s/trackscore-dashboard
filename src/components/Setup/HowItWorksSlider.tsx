import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { CircleDot, PackageCheck, Sparkles, BrainCircuit, Truck, TrendingUp, Package, Globe, Search } from "lucide-react";

const keyframesStyle = `
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const slides = [
  {
    title: "You Received 100 Orders Today",
    description: "Your store is getting customer orders, but not all orders are equal.",
    icon: <Package className="h-10 w-10 text-blue-500" />,
    content: (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-6xl font-bold text-blue-500 mb-4">100</div>
        <p className="text-center text-slate-600">Orders received today through your store</p>
      </div>
    )
  },
  {
    title: "AI Analyzes Every Order",
    description: "Our powerful AI searches the web for behavior patterns across multiple platforms and analyzes over 5000 parameters per order.",
    icon: <BrainCircuit className="h-10 w-10 text-purple-500" />,
    content: (
      <div className="flex flex-col items-center p-4">
        <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="p-3 bg-purple-100 rounded-full">
            <BrainCircuit className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-purple-600">+</div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">+</div>
          <div className="p-3 bg-green-100 rounded-full">
            <Search className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-6 text-center">
          <p className="text-slate-700 font-medium mb-2">Powerful AI scans behavior patterns across:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["Shopify", "Instagram", "Facebook", "TikTok", "Google", "YouTube"].map((platform, index) => (
              <div 
                key={index} 
                className="bg-white p-2 rounded-md text-sm shadow-sm" 
                style={{
                  animation: `fadeIn 0.5s forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0
                }}
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {["Shopify Session", "Device Type", "Order Timing", "Ad Engagement", "Visit Count", "IP Location", "Cart Value", "Previous RTOs", "Payment Method"].map((param, index) => (
            <div 
              key={index} 
              className="bg-slate-50 p-2 rounded-md text-xs text-center shadow-sm" 
              style={{
                animation: `fadeIn 0.5s forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {param}
            </div>
          ))}
        </div>
        <div className="text-center text-purple-700 font-semibold mt-4">
          <span className="text-lg">5000+</span> parameters analyzed per order
        </div>
      </div>
    )
  },
  {
    title: "Quality Bar Analysis",
    description: "We create an order quality bar which identifies which orders bring profit and which orders bring loss.",
    icon: <TrendingUp className="h-10 w-10 text-green-500" />,
    content: (
      <div className="p-4">
        <div className="w-full h-16 bg-gray-200 rounded-lg overflow-hidden mb-3 flex">
          <div className="h-full bg-green-500 w-3/4 relative">
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm md:text-base">
              +₹35,000 Profit
            </span>
          </div>
          
          <div className="h-full bg-red-500 w-1/4 relative">
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm md:text-base">
              -₹12,000 Loss
            </span>
          </div>
        </div>
        <p className="text-center text-slate-600 mt-2">
          TrackScore separates profitable orders from risky ones
        </p>
      </div>
    )
  },
  {
    title: "Ship Only Quality Orders",
    description: "We eliminate orders which bring loss and send WhatsApp notifications to left-out orders with an update address quality option.",
    icon: <PackageCheck className="h-10 w-10 text-amber-500" />,
    content: (
      <div className="p-4">
        <div className="w-full h-16 bg-gray-200 rounded-lg overflow-hidden mb-3 flex">
          <div className="h-full bg-green-500 w-3/4 relative">
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm md:text-base">
              +₹35,000 Profit
            </span>
          </div>
          
          <div className="h-full bg-gray-200 w-1/4 relative">
            <span className="absolute inset-0 flex items-center justify-center text-slate-500 font-semibold text-xs md:text-sm">
              <span className="flex flex-col items-center">
                <Truck className="h-4 w-4 mb-1" />
                WhatsApp Notified
              </span>
            </span>
          </div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-green-600 font-medium">75% Orders Shipped</span>
          <span className="text-slate-500 font-medium">25% Avoided</span>
        </div>
      </div>
    )
  },
  {
    title: "AI Learns From Your Business",
    description: "The AI constantly learns from your specific business data and customer behavior trends.",
    icon: <Sparkles className="h-10 w-10 text-indigo-500" />,
    content: (
      <div className="p-4">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
            <BrainCircuit className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500" />
          </div>
          <div className="space-y-2 text-center">
            <p className="text-slate-700">Your company's unique patterns</p>
            <p className="text-slate-700">Customer behavior analytics</p>
            <p className="text-slate-700">Regional delivery trends</p>
            <p className="text-slate-700">Seasonal variations</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Enjoy Better Business Results",
    description: "Better capital efficiency, lower investment, higher profits, and lifetime COD profitability.",
    icon: <TrendingUp className="h-10 w-10 text-green-500" />,
    content: (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-green-700 font-medium">Capital Efficiency</p>
            <p className="text-green-600 font-bold text-xl">+45%</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-green-700 font-medium">Lower Investment</p>
            <p className="text-green-600 font-bold text-xl">-25%</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-green-700 font-medium">Higher Profits</p>
            <p className="text-green-600 font-bold text-xl">+30%</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-green-700 font-medium">COD Profitability</p>
            <p className="text-green-600 font-bold text-xl">2.5x</p>
          </div>
        </div>
      </div>
    )
  }
];

const HowItWorksSlider = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 mb-8">
      <h3 className="text-xl font-semibold mb-4">How TrackScore Works</h3>
      
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-0 shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-slate-50 rounded-full">
                        {slide.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{slide.title}</h4>
                        <p className="text-sm text-slate-600">{slide.description}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      {slide.content}
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center mt-6">
          <CarouselPrevious className="relative static left-0 right-0 translate-y-0 mr-2" />
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <CircleDot key={index} className="h-3 w-3 text-slate-300" />
            ))}
          </div>
          <CarouselNext className="relative static left-0 right-0 translate-y-0 ml-2" />
        </div>
      </Carousel>
    </div>
  );
};

export default HowItWorksSlider;
