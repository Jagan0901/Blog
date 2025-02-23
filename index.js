const blogList = document.getElementById("blogList");
const blogDetails = document.getElementById("blogDetails");
const head1 = document.querySelector(".inside-hero-three");

// Fetch blog data from a dummy API
fetch("https://admin-backend-rmbp.onrender.com/api/blog") // Sample dummy API for blogs
  .then((response) => response.json())
  .then((blogs) => {
    // Display the list of blogs
    blogs.forEach((blog) => {
      const listItem = document.createElement("div");
      // Display the full content of the blog
      listItem.innerHTML = `
            <img class="blog_img" src=${blog.image}/>
            
            <h1 class="blog_title">${blog.title}</h1>
    
          `;
      listItem.className = "blog-item";

      // Handle click event for each blog item
      listItem.addEventListener("click", () => {
        // Fetch the full blog content
        fetch(`https://admin-backend-rmbp.onrender.com/api/blog/${blog._id}`) // Sample API for individual blog content
          .then((response) => response.json())
          .then((blogDetailsData) => {
            // Display the full content of the blog
            blogDetails.innerHTML = `
            <div class="blog-title">
            <h1 class="blogdetails_head">${blogDetailsData.title}</h1>
            </div>
            <div>
            
            <img class="blogdetails_img" src=${blogDetailsData.image}/>
            
            <h5 class="blogdetails_blog">${blogDetailsData.blog}</h5>
            <a class="bt" href="#" onclick="location.reload();">Back</a>
            </div>
          `;
            // Show the blog details and hide the list
            blogDetails.style.display = "block";
            blogList.style.display = "none";
            head1.style.display = "none";
          })
          .catch((error) =>
            console.error("Error fetching blog details:", error)
          );
      });

      blogList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching blogs:", error);
  });
