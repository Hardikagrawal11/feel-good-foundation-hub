import { useUser } from "@clerk/clerk-react";
import { ImagePlus, Camera } from "lucide-react";

const Gallery = () => {
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "feelgoodnagpur@gmail.com";

  return (
    <div className="pt-32 px-8 max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">Impact Gallery</h1>
          <p className="text-gray-500">Glimpses of the smiles we created together.</p>
        </div>
        
        {/* 2. Admin Upload Button */}
        {isAdmin && (
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg">
            <ImagePlus size={20} /> Upload Impact Photo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <Camera size={40} />
            </div>
            <img src={`https://picsum.photos/400/400?random=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform cursor-pointer" alt="Gallery" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;