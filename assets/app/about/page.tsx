import React from "react";

const About = () => {
  return (
    <div className="flex justify-between pt-[143px] px-[24px] xl:px-[56px] 2xl:px-[200px]  overflow-hidden">
      <div className="w-full">
        <h3 className="text-[35px] leading-[42px] font-bold mb-0 text-black">
          About
        </h3>
        <p className="text-[20px] leading-[1.6] text-black pt-[36px]">
          AI Tracker is an innovative AI-driven search platform designed
          specifically for investors and researchers focused on private
          companies. Unlike other AI search tools such as SearchGPT or
          Perplexity AI, AI Tracker excels in delivering structured summaries of
          the most sought-after dimensions of information pertinent to company
          research. This unique feature enables users to gain comprehensive
          insights efficiently.
        </p>
        <p className="text-[20px] leading-[1.6] text-black pt-[36px]">
          From a long-term perspective, AI Tracker aims to evolve into a dynamic
          marketplace where investors can discover emerging AI deals, directly
          connect with companies, and facilitate private AI deal-making through
          advanced AI matching algorithms. This vision positions AI Tracker as a
          pivotal tool in the landscape of AI investment and corporate research.
        </p>
      </div>
    </div>
  );
};

export default About;
