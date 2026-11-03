const names = ["أسمنت", "حديد تسليح", "طوب", "دهان", "رمل"];
const products = names.map((name, index) => ({
   id: index + 1, name, description: "", cost: 80 + index * 20,
   price: 110 + index * 25, stock: [7, 18, 42, 5, 23][index],
   supplierId: 1, supplierName: "مورد تجريبي", createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(), imageBase64: null, imageMime: null,
}));
const invoices = Array.from({ length: 7 }, (_, index) => ({
   id: 101 + index, customerName: index % 2 ? "عميل آخر" : "عميل تجريبي",
   total: 450 + index * 275, createdAt: new Date(Date.now() - index * 86400000).toISOString(),
   itemsCount: 2, totalQty: 3 + index,
}));
const demoApi = {
   login: async () => ({ ok: true, user: { id: 1, username: "مستخدم تجريبي" } }),
   listProducts: async () => products,
   listSuppliers: async () => [{ id: 1, name: "مورد تجريبي", phone: "", notes: "", createdAt: new Date().toISOString() }],
   listInvoices: async () => invoices,
   getInvoice: async ({ id }: { id: number }) => ({ ...invoices.find((item) => item.id === id), items: [] }),
   getSettings: async () => ({ backupUsbDir: "", backupDriveDir: "", backupLastRun: "" }),
   reportByProduct: async () => products.map((product, index) => ({ productId: product.id, productName: product.name, totalQty: 25 - index * 3, totalAmount: (25 - index * 3) * product.price })),
   reportLowStock: async () => products.filter((product) => product.stock < 10),
   reportStockMoves: async () => [], reportByCustomer: async () => [], reportBySupplier: async () => [],
};
const disabled = async () => { window.alert("هذه نسخة للعرض فقط. لا يمكن حفظ التغييرات."); throw new Error("This demo is read-only."); };
window.api = new Proxy(demoApi, { get: (target, key) => key in target ? target[key as keyof typeof target] : disabled }) as unknown as typeof window.api;
