import React from "react";

const About = () => {
  return (
    <div className="flex justify-between pt-[143px] px-[24px] xl:px-[56px] 2xl:px-[200px]  overflow-hidden">
      <div className="w-full">
        <h3 className="text-[35px] leading-[42px] font-bold mb-0 text-black">
          About
        </h3>
        <div>
          <span className="text-[#9747FF]">Workflos AI</span>: Revolutionizing
          Business Software Discovery and Procurement
        </div>
        <p className="text-[20px] leading-[1.6] text-black pt-[36px]">
          Workflos AI is an innovative platform that transforms how businesses
          find and acquire software solutions. Powered by advanced LLMs, it
          offers intelligent, personalized software recommendations based on
          specific business needs and industry challenges.
        </p>
        <p className="text-[20px] leading-[1.6] text-black pt-[36px]">
          {` The platform streamlines the entire procurement process, from
          discovery to purchase, with features like detailed comparisons,
          AI-driven insights, and automated vendor communication. Workflos AI's
          intuitive interface and powerful capabilities enable businesses to
          make informed software decisions quickly, driving digital
          transformation and operational efficiency.`}
        </p>
      </div>
    </div>
  );
};

export default About;
