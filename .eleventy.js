const isProd = process.env.ENV === "prod";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('img');
    return {
      markdownTemplateEngine: "njk",
      pathPrefix: isProd ? "/recipes/" : "/",  // Only apply in production for GH pages
      dir: {
        input: ".",
        output: "docs"  // GitHub Pages and local will serve from here
      }
    };
  };