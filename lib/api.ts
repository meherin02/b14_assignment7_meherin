import type { Category, Product } from "@/lib/types";

const API_BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchApi<T>(path: string): Promise<T | null> {
  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });

      if (response.status === 404) return null;
      if (!response.ok) continue;

      return (await response.json()) as T;
    } catch {
      // Try the alternative API if the request fails or times out.
    }
  }

  throw new Error("বাজারের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return (await fetchApi<Product[]>(`/products${query}`)) ?? [];
}

export async function getCategories(): Promise<Category[]> {
  return (await fetchApi<Category[]>("/categories")) ?? [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  return fetchApi<Category>(`/categories/${encodeURIComponent(slug)}`);
}

export async function getProduct(id: number): Promise<Product | null> {
  return fetchApi<Product>(`/products/${id}`);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  return product ? getProduct(product.id) : null;
}
