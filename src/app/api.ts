type ApiErrorPayload = {
  errors?: string[];
  message?: string;
};

export type PublicIdea = {
  id: number;
  text: string;
  category: string;
  author_mode: "named" | "anonymous" | "avatar";
  display_name: string;
  created_at: string;
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);
  headers.set("Content-Type", "application/json");
  if (options?.method === "POST") {
    const { token } = await request<{ token: string }>("/api/csrf/");
    headers.set("X-CSRFToken", token);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
      credentials: "same-origin",
    });
  } catch {
    throw new Error("No pudimos conectar con el servidor. Inténtalo nuevamente.");
  }

  if (response.status === 403) {
    throw new Error("No pudimos validar el envío. Recarga la página e inténtalo nuevamente.");
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) throw new Error("El servicio de envío no está disponible en esta vista previa. Inténtalo cuando el servidor esté conectado.");
  const payload = await response.json() as T & ApiErrorPayload;
  if (!response.ok) {
    throw new Error(payload.errors?.join(" ") || payload.message || "La solicitud no pudo completarse.");
  }
  return payload;
}

export function getIdeas(): Promise<{ ok: true; results: PublicIdea[] }> {
  return request("/api/ideas/");
}

export function createIdea(payload: {
  text: string;
  category: string;
  author_mode: string;
  display_name?: string;
}): Promise<{ ok: true; id: number; status: string; message: string }> {
  return request("/api/ideas/", { method: "POST", body: JSON.stringify(payload) });
}

export function reportIdea(id: number): Promise<{ ok: true; message: string }> {
  return request(`/api/ideas/${id}/report/`, {
    method: "POST",
    body: JSON.stringify({ reason: "Contenido reportado desde el sitio público." }),
  });
}

export function createContact(payload: Record<string, unknown>): Promise<{ ok: true; id: number; message: string }> {
  return request("/api/contact/", { method: "POST", body: JSON.stringify(payload) });
}
