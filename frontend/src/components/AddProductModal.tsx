import { useProductStore } from "../stores/useProductStore";
import {
  Package2Icon,
  DollarSignIcon,
  PlusCircleIcon,
  ImageIcon,
} from "lucide-react";

const AddProductModal = () => {
  const { createProduct, formData, setFormData, loading } = useProductStore();

  return (
    <dialog
      id="add_product_modal"
      className="modal modal-bottom sm:modal-middle transition-all duration-300"
    >
      <div className="modal-box p-0 overflow-hidden border border-base-content/10">
        {/* HEADER SECTION */}
        <div className="bg-base-200/50 px-6 py-4 border-b border-base-content/5 flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <PlusCircleIcon className="size-5 text-primary" />
            Add New Product
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>

        <div className="p-6">
          {/* FORM UTAMA */}
          <form onSubmit={(e) => createProduct(e)} className="space-y-5">
            <div className="space-y-4">
              {/* PRODUCT NAME */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold uppercase text-xs opacity-70">
                    Product Name
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
                    <Package2Icon className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Mechanical Keyboard"
                    className="input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100 transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* PRICE & IMAGE URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold uppercase text-xs opacity-70">
                      Price
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
                      <DollarSignIcon className="size-5" />
                    </div>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="0.00"
                      className="input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100 transition-all"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold uppercase text-xs opacity-70">
                      Image URL
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
                      <ImageIcon className="size-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="https://..."
                      className="input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100 transition-all"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* MODAL ACTIONS */}
            <div className="modal-action pt-2 flex gap-2">
              <button
                type="button"
                className="btn btn-ghost flex-1 sm:flex-none"
                onClick={() => {
                  const addProductModal = document.getElementById(
                    "add_product_modal",
                  ) as HTMLDialogElement;
                  addProductModal.close();
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary px-8 shadow-lg shadow-primary/20 flex-1 sm:flex-none"
                disabled={
                  !formData.name ||
                  formData.price <= 0 ||
                  !formData.image ||
                  loading
                }
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <PlusCircleIcon className="size-5 mr-2" />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
          {/* Selesai form utama */}
        </div>
      </div>

      {/* Backdrop tetap di luar */}
      <form
        method="dialog"
        className="modal-backdrop bg-black/40 backdrop-blur-[2px]"
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddProductModal;
