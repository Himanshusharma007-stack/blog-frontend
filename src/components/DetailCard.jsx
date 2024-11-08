import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/Blog"; // Assume you have a service to fetch a single blog
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box"; // Import Box for layout control
import Typography from "@mui/material/Typography"; // Import Typography for text styling
import moment from "moment";

const DetailCard = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const fetchedBlog = await getBlogById(id);
        setBlog(fetchedBlog?.data);
      } catch (err) {
        setError("Failed to load blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card key={blog._id} sx={{ maxWidth: 600, width: "100%", mb: 2 }}>
      <CardContent>
        <h1>{blog.title}</h1>
        <p>{blog.desc}</p>
      </CardContent>

      {/* Add Box for displaying author and createdAt */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Author: {blog.createdBy}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created at: {moment(blog.createdAt).format("ll")}
        </Typography>
      </Box>
    </Card>
  );
};

export default DetailCard;
