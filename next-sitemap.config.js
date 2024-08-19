/** @type {import('next-sitemap').IConfig} */
const config = {
    sourceDir: 'out', // 输入目录
    siteUrl: 'https://aitracker.ai', // 替换为您的域名
    generateRobotsTxt: true, // 生成robots.txt文件
    sitemapSize: 7000, // 每个sitemap文件的最大URL数
  };
  
  module.exports = config;
  