import React from "react";

const Slider = (props) => {
  return (
    <div className="mt-20 overflow-hidden relative pb-10 rounded-2xl max-w-7xl mx-auto px-6">
      <h2 className="text-[35px] font-bold mb-8 text-center">MEET THE TEAM</h2>
      
      <div className="flex gap-10 overflow-x-auto">
      
        <div className="flex-shrink-0 w-110 h-135 p-4">
          <img src={props.img1} className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 1" />
        </div>
        <div className="flex-shrink-0 w-110 h-135 p-4">
          <img src={props.img2} className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 2" />
        </div>
        <div className="flex-shrink-0 w-110 h-135 p-4">
          <img src={props.img3} className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 3" />
        </div>
        <div className="flex-shrink-0 w-110 h-135 p-4">
          <img src={props.img4} className="w-full h-full object-cover rounded-lg shadow-lg" alt="Staff 4" />
        </div>
      </div>
    </div>
  );
};

export default Slider;