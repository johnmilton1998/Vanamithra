// Database Service - Manages all data
class DatabaseService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    // Initialize products if not exists
    if (!localStorage.getItem("vanamitraProducts")) {
      const defaultProducts = [
        { id: 1, name: "Single Pack 1", price: 249, description: "Pure organic coconut oil", image: "/products/Pure organic coconut oil.png" },
        { id: 2, name: "Single Pack 2", price: 299, description: "Herbal Fresh blend", image: "/products/herbal fresh.png" },
        { id: 3, name: "Single Pack 3", price: 349, description: "Coconut Care premium", image: "/products/coconut care.png" },
        { id: 4, name: "Combo 1", price: 499, description: "Assorted oil combo pack", image: "/products/combo 1.png" },
        { id: 5, name: "Combo 2", price: 549, description: "Premium combo package", image: "/products/combo 2.png" },
        { id: 6, name: "Combo 3", price: 599, description: "Deluxe combo selection", image: "/products/combo 3.png" },
        { id: 7, name: "Family Combo Pack", price: 799, description: "Complete family bundle", image: "/products/glow bar.png" }
      ];
      localStorage.setItem("vanamitraProducts", JSON.stringify(defaultProducts));
    }

    // Initialize orders if not exists
    if (!localStorage.getItem("vanamitraOrders")) {
      localStorage.setItem("vanamitraOrders", JSON.stringify([]));
    }
  }

  // ============= PRODUCTS =============
  getProducts() {
    return JSON.parse(localStorage.getItem("vanamitraProducts") || "[]");
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      ...product,
      id: Date.now()
    };
    products.push(newProduct);
    localStorage.setItem("vanamitraProducts", JSON.stringify(products));
    return newProduct;
  }

  updateProduct(id, updates) {
    const products = this.getProducts();
    const updated = products.map(p =>
      p.id === id ? { ...p, ...updates } : p
    );
    localStorage.setItem("vanamitraProducts", JSON.stringify(updated));
    return updated.find(p => p.id === id);
  }

  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem("vanamitraProducts", JSON.stringify(products));
  }

  // ============= ORDERS =============
  getOrders() {
    return JSON.parse(localStorage.getItem("vanamitraOrders") || "[]");
  }

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id);
  }

  addOrder(order) {
    const orders = this.getOrders();
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      status: "Pending",
      date: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem("vanamitraOrders", JSON.stringify(orders));
    return newOrder;
  }

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, status } : o
    );
    localStorage.setItem("vanamitraOrders", JSON.stringify(updated));
  }

  updateOrder(orderId, updates) {
    const orders = this.getOrders();
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, ...updates } : o
    );
    localStorage.setItem("vanamitraOrders", JSON.stringify(updated));
  }

  deleteOrder(orderId) {
    const orders = this.getOrders().filter(o => o.id !== orderId);
    localStorage.setItem("vanamitraOrders", JSON.stringify(orders));
  }

  // ============= STATISTICS =============
  getStatistics() {
    const orders = this.getOrders();
    const products = this.getProducts();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyOrders = orders.filter(o => {
      const orderDate = new Date(o.date);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });
    const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    const statuses = {};
    orders.forEach(o => {
      statuses[o.status] = (statuses[o.status] || 0) + 1;
    });

    return {
      totalOrders,
      totalRevenue,
      monthlyRevenue,
      monthlyOrders: monthlyOrders.length,
      totalProducts: products.length,
      orderStatuses: statuses
    };
  }

  // ============= EXPORT =============
  exportOrdersToCSV() {
    const orders = this.getOrders();
    const headers = ['Order ID', 'User', 'Total', 'Status', 'Date', 'Payment Method'];
    const rows = orders.map(o => [
      o.id,
      o.user,
      o.total,
      o.status,
      new Date(o.date).toLocaleDateString(),
      o.payment === 'cod' ? 'COD' : 'UPI'
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    return csv;
  }

  downloadCSV(filename) {
    const csv = this.exportOrdersToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export default new DatabaseService();
