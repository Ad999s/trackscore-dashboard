
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { 
  CircleDot, 
  PackageCheck, 
  Sparkles, 
  BrainCircuit, 
  Truck, 
  TrendingUp, 
  Package, 
  Globe, 
  Search, 
  ShoppingCart,
  Phone,
  MapPin,
  Check,
  X,
  Ban,
  BarChart4,
  Bell,
  Facebook
} from "lucide-react";

const keyframesStyle = `
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes slideIn {
    0% { transform: translateX(-20px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
`;

const slides = [
  {
    title: "Order Analysis",
    description: "TrackScore analyzes each order's behavior patterns and shopping history.",
    icon: <Package className="h-10 w-10 text-blue-500" />,
    content: ({ active }) => (
      <div className="flex flex-col items-center justify-center p-4">
        <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
        
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 w-full">
          <div className="font-semibold text-blue-700 mb-2 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Order #1001
          </div>
          
          <div className="space-y-3">
            {[
              { icon: <ShoppingCart className="h-4 w-4" />, text: "Added to cart 3 times before purchase" },
              { icon: <Phone className="h-4 w-4" />, text: "Browsing from mobile device" },
              { icon: <MapPin className="h-4 w-4" />, text: "Location: Mumbai, Maharashtra" },
              { icon: <Globe className="h-4 w-4" />, text: "Engaged with 2 Instagram ads" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center text-sm bg-white p-2 rounded-md shadow-sm"
                style={{
                  animation: active ? `slideIn 0.5s forwards` : 'none',
                  animationDelay: `${idx * 0.15}s`,
                  opacity: active ? 1 : 0
                }}
              >
                <span className="flex-shrink-0 p-1 bg-blue-100 rounded-full mr-2">
                  {item.icon}
                </span>
                <span className="text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    title: "AI Analyzes Every Order",
    description: "Our powerful AI searches the web for behavior patterns across multiple platforms and analyzes over 5000 parameters per order.",
    icon: <BrainCircuit className="h-10 w-10 text-purple-500" />,
    content: ({ active }) => (
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
        
        <div className="text-center text-slate-700 font-medium mb-4">
          Powerful AI searches the web for behavior patterns across multiple platforms
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {["Shopify Session", "Device Type", "Order Timing", "Ad Engagement", "Visit Count", "IP Location", "Cart Value", "Previous RTOs", "Payment Method"].map((param, index) => (
            <div 
              key={index} 
              className="bg-slate-50 p-2 rounded-md text-xs text-center shadow-sm" 
              style={{
                animation: active ? `fadeIn 0.5s forwards` : 'none',
                animationDelay: `${index * 0.1}s`,
                opacity: active ? 1 : 0
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
    content: ({ active }) => (
      <div className="p-4">
        <div className="w-full h-16 bg-gray-200 rounded-lg overflow-hidden mb-3 flex">
          <div 
            className="h-full bg-green-500 w-3/4 relative transition-all duration-1000" 
            style={{ 
              transform: active ? 'scaleX(1)' : 'scaleX(0)', 
              transformOrigin: 'left'
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm md:text-base">
              +₹35,000 Profit
            </span>
          </div>
          
          <div 
            className="h-full bg-red-500 w-1/4 relative transition-all duration-1000" 
            style={{ 
              transform: active ? 'scaleX(1)' : 'scaleX(0)', 
              transformOrigin: 'left',
              transitionDelay: '0.3s'
            }}
          >
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
    title: "Block High-Risk Orders",
    description: "We block orders with high RTO risk and send WhatsApp notifications for confirmation.",
    icon: <Ban className="h-10 w-10 text-red-500" />,
    content: ({ active }) => (
      <div className="p-4">
        <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
        
        <div 
          className="p-4 border border-red-200 rounded-lg bg-red-50 mb-4 flex items-center"
          style={{
            animation: active ? 'scaleIn 0.5s forwards' : 'none',
            opacity: active ? 1 : 0
          }}
        >
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <Ban className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <div className="font-semibold text-slate-700">Order #1001: STOPPED</div>
            <div className="text-sm text-slate-600 flex items-center mt-1">
              <Bell className="h-4 w-4 mr-1 text-green-600" />
              WhatsApp notification sent for confirmation
            </div>
          </div>
        </div>
        
        <div 
          className="p-3 border border-amber-200 rounded-lg bg-amber-50 mb-4 flex items-center"
          style={{
            animation: active ? 'scaleIn 0.5s forwards' : 'none',
            animationDelay: '0.2s',
            opacity: active ? 1 : 0
          }}
        >
          <div className="font-medium text-amber-800">
            <span className="font-bold">-₹12,000</span> potential loss prevented
          </div>
        </div>
        
        <div className="text-sm text-slate-600 mt-4 text-center">
          High-risk orders are automatically held for verification
        </div>
      </div>
    )
  },
  {
    title: "Delivery Performance Comparison",
    description: "Compare the difference in profit between TrackScore and traditional shipping.",
    icon: <TrendingUp className="h-10 w-10 text-green-500" />,
    content: ({ active }) => (
      <div className="p-4">
        <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
        
        <div className="flex space-x-4 mb-6">
          <div 
            className="flex-1 border border-green-200 rounded-lg p-3 bg-green-50"
            style={{
              animation: active ? 'fadeIn 0.5s forwards' : 'none',
              opacity: active ? 1 : 0
            }}
          >
            <div className="text-center font-semibold text-green-700 mb-2">With TrackScore</div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(order => (
                <div key={order} className="flex items-center justify-between bg-white p-2 rounded-md">
                  <span className="text-xs text-slate-700">Order #{1000 + order}</span>
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              ))}
            </div>
            <div className="mt-3 text-center font-semibold text-green-700">
              Profit: ₹35,000
            </div>
          </div>
          
          <div 
            className="flex-1 border border-slate-200 rounded-lg p-3 bg-slate-50"
            style={{
              animation: active ? 'fadeIn 0.5s forwards' : 'none',
              animationDelay: '0.3s',
              opacity: active ? 1 : 0
            }}
          >
            <div className="text-center font-semibold text-slate-700 mb-2">Without TrackScore</div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(order => (
                <div key={order} className="flex items-center justify-between bg-white p-2 rounded-md">
                  <span className="text-xs text-slate-700">Order #{1000 + order}</span>
                  {order <= 2 ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-center font-semibold text-slate-700">
              Profit: ₹23,000
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Blocking High-Risk Factors",
    description: "Identify and block problematic pincodes, states, and other risk factors.",
    icon: <MapPin className="h-10 w-10 text-amber-500" />,
    content: ({ active }) => (
      <div className="p-4">
        <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
        
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div 
            className="bg-red-50 border border-red-200 rounded-lg p-3"
            style={{
              animation: active ? 'fadeIn 0.5s forwards' : 'none',
              opacity: active ? 1 : 0
            }}
          >
            <div className="font-medium text-red-700 mb-2">High RTO Pincodes</div>
            <div className="grid grid-cols-3 gap-1">
              {["110001", "400001", "500001", "700001"].map((code, idx) => (
                <div key={idx} className="bg-white text-xs p-1 rounded text-center">
                  {code}
                </div>
              ))}
            </div>
          </div>
          
          <div 
            className="bg-amber-50 border border-amber-200 rounded-lg p-3"
            style={{
              animation: active ? 'fadeIn 0.5s forwards' : 'none',
              animationDelay: '0.2s',
              opacity: active ? 1 : 0
            }}
          >
            <div className="font-medium text-amber-700 mb-2">High Risk States</div>
            <div className="grid grid-cols-2 gap-1">
              {["Bihar", "UP", "Rajasthan", "MP"].map((state, idx) => (
                <div key={idx} className="bg-white text-xs p-1 rounded text-center">
                  {state}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div 
          className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4"
          style={{
            animation: active ? 'fadeIn 0.5s forwards' : 'none',
            animationDelay: '0.4s',
            opacity: active ? 1 : 0
          }}
        >
          <div className="font-medium text-blue-700 mb-2">Marketing Optimization</div>
          <div className="flex items-center justify-between bg-white p-2 rounded-md">
            <div className="flex items-center">
              <Facebook className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm">Facebook Pixel Quality</span>
            </div>
            <div className="text-green-600 text-sm font-medium">+45%</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Performance Comparison",
    description: "See how TrackScore outperforms traditional RTO tools.",
    icon: <BarChart4 className="h-10 w-10 text-indigo-500" />,
    content: ({ active }) => (
      <div className="p-4">
        <div 
          className="h-48 relative mb-4 border border-slate-200 rounded-lg p-3"
          style={{
            animation: active ? 'fadeIn 0.5s forwards' : 'none',
            opacity: active ? 1 : 0
          }}
        >
          {/* Base line */}
          <div className="absolute bottom-6 left-0 right-0 h-px bg-slate-300"></div>
          
          {/* Y-axis label */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-500 -rotate-90">
            Performance
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-1 left-1/4 -translate-x-1/2 text-xs text-slate-500">
            First Month
          </div>
          <div className="absolute bottom-1 left-2/4 -translate-x-1/2 text-xs text-slate-500">
            Second Month
          </div>
          <div className="absolute bottom-1 left-3/4 -translate-x-1/2 text-xs text-slate-500">
            Third Month
          </div>
          
          {/* TrackScore graph line */}
          <div 
            className="absolute bottom-6 left-[10%] w-[80%] h-[60%]"
            style={{
              clipPath: active ? 'polygon(0% 100%, 33% 60%, 66% 30%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%)',
              background: 'linear-gradient(to top, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0))',
              transition: 'clip-path 1s ease-in-out'
            }}
          ></div>
          
          <div 
            className="absolute bottom-6 left-[10%] h-[60%] border-2 border-green-500"
            style={{
              width: active ? 'calc(80%)' : '0%',
              borderTop: '2px solid #22c55e',
              borderRight: 'none',
              borderBottom: 'none',
              borderLeft: 'none',
              borderRadius: '0 80px 0 0',
              transition: 'width 1s ease-in-out'
            }}
          ></div>
          
          {/* Traditional RTO tools graph line */}
          <div 
            className="absolute bottom-6 left-[10%] w-[80%] h-[30%]"
            style={{
              clipPath: active ? 'polygon(0% 100%, 33% 80%, 66% 60%, 100% 40%, 100% 100%, 0% 100%)' : 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%)',
              background: 'linear-gradient(to top, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0))',
              transition: 'clip-path 1s ease-in-out',
              transitionDelay: '0.3s'
            }}
          ></div>
          
          <div 
            className="absolute bottom-6 left-[10%] h-[30%] border-2 border-indigo-500"
            style={{
              width: active ? 'calc(80%)' : '0%',
              borderTop: '2px solid #6366f1',
              borderRight: 'none',
              borderBottom: 'none',
              borderLeft: 'none',
              borderRadius: '0 40px 0 0',
              transition: 'width 1s ease-in-out',
              transitionDelay: '0.3s'
            }}
          ></div>
          
          {/* Legend */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1">
            <div className="flex items-center text-xs">
              <span className="h-3 w-3 bg-green-500 rounded-full mr-1"></span>
              <span>TrackScore</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="h-3 w-3 bg-indigo-500 rounded-full mr-1"></span>
              <span>Traditional Tools</span>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-slate-600">
          TrackScore continuously improves over time as it learns from your business data
        </div>
      </div>
    )
  }
];

const HowItWorksSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 mb-8">
      <h3 className="text-xl font-semibold mb-4">How TrackScore Works</h3>
      
      <Carousel 
        className="w-full max-w-3xl mx-auto"
        onSelect={(index) => setActiveSlide(index)}
      >
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
                      {slide.content({ active: index === activeSlide })}
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
              <CircleDot 
                key={index} 
                className={`h-3 w-3 ${index === activeSlide ? 'text-blue-500' : 'text-slate-300'} cursor-pointer`} 
                onClick={(e) => {
                  // Prevent passing the event to setActiveSlide
                  e.preventDefault();
                  setActiveSlide(index);
                }}
              />
            ))}
          </div>
          <CarouselNext className="relative static left-0 right-0 translate-y-0 ml-2" />
        </div>
      </Carousel>
    </div>
  );
};

export default HowItWorksSlider;
