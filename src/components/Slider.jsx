import React from "react";

const Slider = (props) => {
  return (
    <div className="mt-20 overflow-hidden relative pb-10 rounded-2xl max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-8 text-center">{props.title}</h2>
      
      <div className="flex gap-6 overflow-x-auto">
      
        <div className="flex-shrink-0 w-72 h-72 p-2">
          <img src={props.images.img1} className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 1" />
        </div>
        <div className="flex-shrink-0 w-72 h-72 p-2">
          <img src={props.images.img2} className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 2" />
        </div>
        <div className="flex-shrink-0 w-72 h-72 p-2">
          <img src={props.images.img3} className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 3" />
        </div>
        <div className="flex-shrink-0 w-72 h-72 p-2">
          <img src={props.images.img4} className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 4" />
        </div>
      </div>
    </div>
  );
};

export default Slider;