import styls from "./index.module.css";
const BlogBanner = () => {
  return (
    <div id="blog-section" className={styls.blog}>
      <div className={styls.mask}>
        <div className={styls.container}>
          <div className={styls.text_block}>
            <h1>
              <span style={{ color: "#bd00ff" }}>B</span>log
            </h1>
            <div className={styls.desc}>
              The AI Apex Asia blog serves as a hub for engaging discussions and
              authoritative content on positioning Asia at the forefront of the
              AI-powered digital economy. Our team of experts and industry
              leaders share their perspectives on the cutting-edge advancements,
              real-world applications, and critical challenges surrounding AI
              governance and adoption across Asia. Stay informed on the
              innovative approaches, collaborative efforts, and strategic vision
              shaping the region's AI ecosystem for sustainable growth and
              societal impact.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
