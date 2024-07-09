import styls from "./index.module.css";

const About = () => {
  return (
    <div className={styls.about}>
      <div className={styls.left}>
        <h3 className={styls.title}>About</h3>
        <p className={styls.text}>
          <span style={{ color: "#9747FF" }}>Workflos AI</span>: Revolutionizing
          Business Software Discovery and Procurement
        </p>
        <p className={styls.text}>
          Workflos AI is an innovative platform that transforms how businesses
          find and acquire software solutions. Powered by advanced LLMs, it
          offers intelligent, personalized software recommendations based on
          specific business needs and industry challenges.
        </p>

        <p className={styls.text}>
          The platform streamlines the entire procurement process, from
          discovery to purchase, with features like detailed comparisons,
          AI-driven insights, and automated vendor communication. Workflos AI's
          intuitive interface and powerful capabilities enable businesses to
          make informed software decisions quickly, driving digital
          transformation and operational efficiency.
        </p>
      </div>
      <div className={styls.right}></div>
    </div>
  );
};

export default About;
