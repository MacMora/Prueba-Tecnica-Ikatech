import ProductPage from "../../../components/ProductPage";

export default function Producto({ params }: { params: { nombre: string } }) {
  return <ProductPage nombre={params.nombre} />;
} 