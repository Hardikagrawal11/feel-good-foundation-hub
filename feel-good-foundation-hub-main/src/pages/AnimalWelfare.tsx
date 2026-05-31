import { PawPrint, HeartPulse } from "lucide-react";

const AnimalWelfare = () => {
  return (
    <div className="pt-32 px-8 max-w-4xl mx-auto pb-20">
      <div className="bg-orange-50 p-10 rounded-3xl border border-orange-100">
        <PawPrint className="text-orange-500 w-16 h-16 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Animal Welfare Domain</h1>
        <p className="text-lg text-gray-600 mb-8">
          Giving a voice to the voiceless. Our animal welfare domain focuses on stray rescues, 
          medical aid for injured animals, and vaccination drives across Nagpur.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <HeartPulse className="text-red-500 mb-2" />
            <h3 className="font-bold text-xl mb-2">Emergency Rescue</h3>
            <p className="text-gray-500 text-sm">24/7 ambulance service for injured strays and wildlife.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalWelfare;