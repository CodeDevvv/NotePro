import { supabase } from "../../../supabaseClient";

export const getUserID = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id;
};

export const titleToSlug = async (title) => {
  const baseSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
  let slug = baseSlug;
  let counter = 1;

  // Check if the slug already exists in the database
  while (true) {
    const { data } = await supabase.from("notes").select("id").eq("slug", slug).single();
    if (!data) break;
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
};
