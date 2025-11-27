import supabase from "../supabase/index";

// Busca o profile completo do usuário
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, role")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

// Retorna apenas o role do usuário autenticado
export async function getAuthenticatedUserRole() {
  // 1. Pega o usuário atual via auth
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const userId = session.session.user.id;

  // 2. Busca o profile do user
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data.role;
}
