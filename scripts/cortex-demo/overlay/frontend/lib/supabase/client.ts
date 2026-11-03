// This isolated demo has a single public account and no production data.
const user = { id: "demo", email: "demo@cortex.example", user_metadata: { full_name: "Demo Student" } };
const hasSession = () => typeof document !== "undefined" && document.cookie.split("; ").includes("cortex_demo=1");
const session = () => hasSession() ? { access_token: "shared-demo", refresh_token: "shared-demo", user } : null;

export function createClient(): any {
  const unsupported = () => {
    let write = false;
    const result: any = new Proxy({}, {
      get(_target, prop) {
        if (prop === "then") return (resolve: (v: unknown) => void) => resolve({ data: [], error: write ? new Error("This feature is unavailable in the shared demo.") : null });
        if (["insert", "update", "delete", "upsert"].includes(String(prop))) write = true;
        return () => result;
      },
    });
    return result;
  };
  return {
    auth: {
      getSession: async () => ({ data: { session: session() }, error: null }),
      getUser: async () => ({ data: { user: hasSession() ? user : null }, error: null }),
      setSession: async () => { document.cookie = "cortex_demo=1; Path=/; SameSite=Lax; Max-Age=86400"; return { data: { session: session() }, error: null }; },
      signOut: async () => { document.cookie = "cortex_demo=; Path=/; Max-Age=0; SameSite=Lax"; return { error: null }; },
      signInWithOAuth: async () => ({ error: new Error("External sign-in is unavailable in the demo.") }),
    },
    from: unsupported,
  };
}
export async function getAccessToken() { return session()?.access_token ?? null; }
export async function getUserId() { return session()?.user.id ?? null; }
