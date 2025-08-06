import supabase from "../client";

const createNewPost = async (title, body, image_url) => {
  const { error } = await supabase.from("posts").insert([
    {
      title,
      body,
      image_url,
      upvotes: 0,
      comments: [],
    },
  ]);

  if (error) {
    throw new Error(error);
  }
};

export default createNewPost;
