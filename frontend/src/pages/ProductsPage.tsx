import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import {
  ArrowLeftIcon,
  DollarSignIcon,
  CalendarIcon,
  Trash2Icon,
  EditIcon,
  AlertTriangleIcon,
  Package2Icon,
  ImageIcon,
  SaveIcon,
} from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchProduct,
    currentProduct,
    loading,
    deleteProduct,
    formData,
    setFormData,
    updateProduct,
  } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
    }
  }, [id, fetchProduct]);

  const openEditModal = () => {
    if (currentProduct) {
      setFormData(currentProduct);
      (document.getElementById("edit_modal") as HTMLDialogElement).showModal();
    }
  };

  const handleDelete = async () => {
    if (currentProduct) {
      await deleteProduct(currentProduct.id);
      navigate("/");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    await updateProduct(e);
    if (id) fetchProduct(Number(id));
    (document.getElementById("edit_modal") as HTMLDialogElement).close();
  };

  if (loading && !currentProduct) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold opacity-50">Product Not Found</h2>
        <button onClick={() => navigate("/")} className="btn btn-ghost mt-4">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="btn btn-ghost gap-2 mb-6">
        <ArrowLeftIcon size={18} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-base-200 p-8 rounded-3xl border border-base-content/5 shadow-xl">
        <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-base-300">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="badge badge-primary badge-outline mb-2">
                Inventory Item
              </div>
              <h1 className="text-4xl font-extrabold text-base-content">
                {currentProduct.name}
              </h1>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <DollarSignIcon size={24} />
                </div>
                <div>
                  <p className="text-xs opacity-50 uppercase font-bold tracking-wider">
                    Price
                  </p>
                  <p className="text-2xl font-bold">
                    ${currentProduct.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-base-300 p-3 rounded-xl">
                  <CalendarIcon size={24} />
                </div>
                <div>
                  <p className="text-xs opacity-50 uppercase font-bold tracking-wider">
                    Created At
                  </p>
                  <p className="text-md font-medium">
                    {new Date(currentProduct.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-10">
            <button
              onClick={openEditModal}
              className="btn btn-primary flex-1 gap-2"
            >
              <EditIcon size={18} /> Edit Product
            </button>
            <button
              onClick={() =>
                (
                  document.getElementById("delete_modal") as HTMLDialogElement
                ).showModal()
              }
              className="btn btn-error btn-outline"
            >
              <Trash2Icon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL DELETE --- */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box border border-error/20">
          <div className="flex items-center gap-4 text-error mb-4">
            <AlertTriangleIcon size={28} />
            <h3 className="font-bold text-xl">Confirm Delete</h3>
          </div>
          <p>
            Are you sure you want to delete <b>{currentProduct.name}</b>?
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex-1">
              <button className="btn btn-ghost w-full">Cancel</button>
            </form>
            <button onClick={handleDelete} className="btn btn-error flex-1">
              Delete
            </button>
          </div>
        </div>
      </dialog>

      {/* --- MODAL EDIT --- */}
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box border border-base-content/10 p-0 overflow-hidden">
          <div className="bg-base-300 px-6 py-4 flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <EditIcon className="size-5 text-primary" /> Edit Product
            </h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>

          <form onSubmit={handleUpdate} className="p-6 space-y-4">
            {/* NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Product Name</span>
              </label>
              <div className="relative">
                <Package2Icon className="absolute left-3 top-3 size-5 opacity-40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* PRICE & IMAGE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Price</span>
                </label>
                <div className="relative">
                  <DollarSignIcon className="absolute left-3 top-3 size-5 opacity-40" />
                  <input
                    type="number"
                    className="input input-bordered w-full pl-10"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Image URL</span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 size-5 opacity-40" />
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary btn-block gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  <>
                    <SaveIcon size={18} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProductPage;
