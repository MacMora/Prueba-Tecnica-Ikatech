import ProductPage from "../../../components/ProductPage";

interface PageProps {
  params: Promise<{ nombre: string }>;
}

export default async function Producto({ params }: PageProps) {
  const { nombre } = await params;
  return <ProductPage nombre={nombre} />;
} 