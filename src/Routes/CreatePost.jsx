import supabase from "../API/client.js";
import createNewPost from "../API/posts/createNewPost.js";
import { useState } from "react";
const CreatePost = () => {
  const [formOptions, setFormOptions] = useState({
    title: "",
    body: "",
    imageFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormOptions({
        ...formOptions,
        imageFile: file,
      });
    } else {
      setFormOptions({
        ...formOptions,
        imageFile: null,
      });
      alert("Please select a valid image file.");
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `/uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(filePath, file);
    if (uploadError) {
      throw new Error(uploadError);
    }
    const { data: publicUrl } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    return publicUrl.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      let imageUrl = null;

      if (formOptions.imageFile) {
        imageUrl = await uploadImage(formOptions.imageFile);
      }

      await createNewPost(formOptions.title, formOptions.body, imageUrl);

      setFormOptions({
        title: "",
        body: "",
        imageFile: null,
      });
    } catch (error) {
      console.error("Submission error:", error.message);
      setError("Something went wrong while submitting your post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New post</h2>

      <label htmlFor="title">
        Title<span aria-label="required">*</span>:
      </label>
      <input
        type="text"
        value={formOptions.title}
        id="title"
        name="title"
        required
        onChange={(e) =>
          setFormOptions({ ...formOptions, title: e.target.value })
        }
      />
      <br />
      <label htmlFor="body">Body (optional):</label>
      <br />
      <textarea
        value={formOptions.body}
        id="body"
        name="body"
        onChange={(e) =>
          setFormOptions({ ...formOptions, body: e.target.value })
        }
      />
      <br />
      <label htmlFor="user-image">Upload an image (optional):</label>
      <br />
      <input
        type="file"
        name="user-image"
        id="user-image"
        accept="image/*"
        onChange={handleImageChange}
      />
      <br />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Submit Post"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CreatePost;
