import { Link } from "react-router-dom";
import type { Product } from "../utils";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductCard = ({ product }: { product: Product }) => {
  const { deleteProduct, setCurrentProduct  } = useProductStore();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0
         w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">
          ${Number(product.price).toFixed(2)}
        </p>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-sm btn-info btn-outline"
            onClick={() => setCurrentProduct(product)}
          >
            <EditIcon className="size-4" />
          </Link>
          <button
            className="btn btn-error"
            onClick={() => {
              const modal = document.getElementById(
                `my_modal_${product.id}`,
              ) as HTMLDialogElement;
              modal.showModal();
            }}
          >
            <Trash2Icon className="size-4" />
          </button>
          <dialog id={`my_modal_${product.id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Are you sure?</h3>

              <div className="modal-action">
                <form method="dialog">
                  <button
                    className="btn btn-error"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
