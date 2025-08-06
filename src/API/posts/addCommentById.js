import supabase from "../client";

const addCommentById = async (comment, oldComments, id) => {
  const updatedComment = [...oldComments, comment];
  const { error } = await supabase
    .from("posts")
    .update({ comments: updatedComment })
    .eq("id", id);
  if (error) {
    throw new Error(error);
  }
};

export default addCommentById;
