import supabase from "../client.js";

const updatePost = async (id, { title, body, image_url }) => {
  const { error } = await supabase
    .from("posts")
    .update({ title, body, image_url })
    .eq("id", id);

  if (error) throw new Error(error.message);
};

export default updatePost;
