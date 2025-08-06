import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../API/client.js";
import updatePost from "../API/posts/updatePost.js";
import getPostById from "../API/posts/getPostById.js";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formOptions, setFormOptions] = useState({
    title: "",
    body: "",
    imageFile: null,
    existingImageUrl: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(id);

      setFormOptions({
        title: data.title,
        body: data.body || "",
        imageFile: null,
        existingImageUrl: data.image_url || null,
      });
    };

    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormOptions({ ...formOptions, imageFile: file });
    } else {
      setFormOptions({ ...formOptions, imageFile: null });
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
      throw new Error(uploadError.message);
    }

    const { data: publicUrl } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    return publicUrl.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = formOptions.existingImageUrl;

      if (formOptions.imageFile) {
        imageUrl = await uploadImage(formOptions.imageFile);
      }

      await updatePost(id, {
        title: formOptions.title,
        body: formOptions.body,
        image_url: imageUrl,
      });

      navigate(`/post/${id}`); // Optional: navigate to post detail page
    } catch (error) {
      console.error("Update error:", error.message);
      setError("Something went wrong while updating the post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>

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

      <label htmlFor="user-image">Replace image (optional):</label>
      <br />
      <input
        type="file"
        name="user-image"
        id="user-image"
        accept="image/*"
        onChange={handleImageChange}
      />
      {formOptions.existingImageUrl && !formOptions.imageFile && (
        <div>
          <p>Current image:</p>
          <img
            src={formOptions.existingImageUrl}
            alt="Current"
            style={{ maxWidth: "200px" }}
          />
        </div>
      )}
      <br />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Post"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default EditPost;
