import { create } from "zustand";

const useDataStore = create((set) => ({
  data: JSON.parse(localStorage.getItem("capturas")) || [],
  loading: false,
  error: null,

  // Obtener datos del backend
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("https://backend-universidad-hackweb.onrender.com/api/capturas");
      if (!res.ok) throw new Error("Error al obtener datos");
      const json = await res.json();
    localStorage.setItem("capturas", JSON.stringify(json));
      set({ data: json, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Agregar un nuevo registro
  addData: (newEntry) =>
    set((state) => ({
      data: [...state.data, newEntry],
    })),

  // Reemplazar todo el array manualmente
  setData: (newDataArray) =>
    set(() => ({
      data: newDataArray,
    })),

  // Actualizar un objeto por ip
  updateData: (ip, updatedFields) =>
    set((state) => ({
      data: state.data.map((item) =>
        item.ipPublica === ip ? { ...item, ...updatedFields } : item
      ),
    })),

  // Limpiar store
  clearData: () => set({ data: [] }),
}));

export default useDataStore;