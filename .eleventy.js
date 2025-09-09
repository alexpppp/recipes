export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('img');
    return {
      markdownTemplateEngine: "njk",
      pathPrefix: "/recipes/",  // <--- matches your GitHub Pages subpath
      dir: {
        input: ".",
        output: "docs"  // GitHub Pages and local will serve from here
      }
    };
  };