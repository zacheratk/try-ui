import supabase from "../client";
const getAllPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error);
  }

  return data;
};

export default getAllPosts;
