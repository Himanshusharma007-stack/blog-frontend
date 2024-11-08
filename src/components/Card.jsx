import * as React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { getAllBlogs } from "../services/Blog";

export default function ActionAreaCard() {
  const [blogs, setBlogs] = React.useState([]);
  const [expandedStates, setExpandedStates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch blogs when component mounts
  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getAllBlogs();
        console.log("fetchedBlogs ============ ", fetchedBlogs);

        setBlogs(fetchedBlogs?.data);
        setExpandedStates(fetchedBlogs?.data.map(() => false)); // Initialize expanded states
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Toggle the expand/collapse state of a blog description
  const toggleExpand = (index) => {
    setExpandedStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  // Handle card click to navigate to the detail page
  const handleCardClick = (blogId) => {
    navigate(`/blog/${blogId}`); // Redirect to the blog detail page
  };

  // If loading, show a loading message
  if (loading) {
    return (
      <Typography variant="h6" textAlign="center">
        Loading...
      </Typography>
    );
  }

  // If there's an error, show an error message
  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  return (
    <>
      {blogs.map((blog, index) => (
        <Card key={blog._id} sx={{ maxWidth: 600, width: "100%", mb: 2 }}>
          <CardActionArea onClick={() => handleCardClick(blog._id)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {blog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {expandedStates[index]
                  ? blog.desc
                  : `${blog.desc.slice(0, 210)}...`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Box sx={{ p: 2, textAlign: "right" }}>
            <Button size="small" onClick={() => toggleExpand(index)}>
              {expandedStates[index] ? "Read Less" : "Read More"}
            </Button>
          </Box>
        </Card>
      ))}
    </>
  );
}
