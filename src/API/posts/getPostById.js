import supabase from "../client";

const getPostById = async (id) => {
  try {
    const { data, error } = await supabase.from("posts").select().eq("id", id);

    if (error) {
      throw new Error(error);
    }

    return data[0];
  } catch (error) {
    throw new Error("Error fetching post by id: " + error);
  }
};

export default getPostById;
