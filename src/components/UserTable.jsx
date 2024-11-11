import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  getBlogsByAuthormailId,
  createNewBlog,
  updateBlogById,
  deleteBlogById
} from "../services/Blog";
import localStorageFunctions from "../utils/localStorageFunctions.js";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    _id: "",
    title: "",
    desc: "",
  });
  const email = JSON.parse(localStorageFunctions.getDatafromLocalstorage('user')).email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('JSON.parse ---- ',email);
        
        const response = await getBlogsByAuthormailId({ email });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (blog = { _id: "", title: "", desc: "" }) => {
    console.log("blog === ", blog);

    setCurrentBlog(blog);
    setIsEditing(!!blog._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentBlog({ _id: "", title: "", desc: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await updateBlogById(currentBlog);
      } else {
        await createNewBlog(currentBlog);
      }

      const response = await getBlogsByAuthormailId({ email });
      console.log("resoponse ---- ", response);

      setData(response.data);
      handleClose();
    } catch (error) {
      setError(error);
    }
  };

  // Function to delete a blog
  const handleDelete = async (blogId) => {
    try {
        console.log('blogId --- ',blogId);
        
      await deleteBlogById(blogId);  // Delete the blog by its ID
      // After deletion, update the data by fetching the latest blogs
      const response = await getBlogsByAuthormailId({ email });
      setData(response.data);  // Update the state with the new blog list
    } catch (error) {
      setError(error);  // Set error if something goes wrong
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Function to truncate the description if it exceeds a certain length
  const truncateDescription = (desc, maxLength = 100) => {
    if (desc.length > maxLength) {
      return `${desc.slice(0, maxLength)}...`;
    }
    return desc;
  };

  return (
    <div>
      <div
        style={{
          marginTop: "16px",
          marginBottom: "16px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          textAlign: "center",
          fontWeight: 'bold'
        }}
      >
        {`Hello, ${
          JSON.parse(localStorageFunctions.getDatafromLocalstorage("user"))
            .username
        } with email - ${
          JSON.parse(localStorageFunctions.getDatafromLocalstorage("user"))
            .email
        }`}
      </div>
      <Button
        sx={{
          marginTop: 2,
          marginBottom: 2,
          marginLeft: "auto",
          display: "block",
        }}
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
      >
        Add New Blog
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{truncateDescription(row.desc)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(row._id)} // Handle delete
                    sx={{ marginLeft: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Edit Blog" : "Add New Blog"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={currentBlog.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="desc"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={currentBlog.desc}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
