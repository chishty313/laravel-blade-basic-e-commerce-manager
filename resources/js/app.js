import './bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class ProductManager {
    constructor() {
        this.products = [];
        this.categories = [];
        this.editingProduct = null;
        this.editingCategory = null;
        this.init();
    }

    async init() {
        await this.fetchData();
        this.bindEvents();
        this.updateStats();
    }

    async fetchData() {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                fetch('/products'),
                fetch('/categories')
            ]);
            
            this.products = await productsRes.json();
            this.categories = await categoriesRes.json();
            
            this.renderData();
            this.loadCategoryCheckboxes();
        } catch (error) {
            console.error('Error fetching data:', error);
            this.showAlert('Error loading data', 'danger');
        }
    }

    bindEvents() {
        // Category form submission
        document.getElementById('categoryForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveCategory();
        });

        // Product form submission
        document.getElementById('productForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveProduct();
        });

        // Reset forms when modals are closed
        document.getElementById('categoryModal').addEventListener('hidden.bs.modal', () => {
            this.resetCategoryForm();
        });

        document.getElementById('productModal').addEventListener('hidden.bs.modal', () => {
            this.resetProductForm();
        });
    }

    async saveCategory() {
        const formData = new FormData(document.getElementById('categoryForm'));
        const data = Object.fromEntries(formData.entries());
        
        // Convert is_active to boolean
        data.is_active = data.is_active === '1';

        try {
            const url = this.editingCategory ? `/categories/${this.editingCategory.id}` : '/categories';
            const method = this.editingCategory ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save category');
            }

            const result = await response.json();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
            modal.hide();
            
            // Show success message
            this.showAlert(
                `Category ${this.editingCategory ? 'updated' : 'created'} successfully!`, 
                'success'
            );
            
            // Refresh data
            await this.fetchData();
            
        } catch (error) {
            console.error('Error saving category:', error);
            this.showAlert(`Error: ${error.message}`, 'danger');
        }
    }

    async saveProduct() {
        const formData = new FormData(document.getElementById('productForm'));
        const data = Object.fromEntries(formData.entries());
        
        // Convert numeric fields
        data.price = parseFloat(data.price);
        data.sale_price = data.sale_price ? parseFloat(data.sale_price) : null;
        data.stock_quantity = parseInt(data.stock_quantity) || 0;
        data.is_active = data.is_active === '1';

        // Get selected categories
        const categoryCheckboxes = document.querySelectorAll('#productCategories input[type="checkbox"]:checked');
        data.category_ids = Array.from(categoryCheckboxes).map(cb => parseInt(cb.value));

        try {
            const url = this.editingProduct ? `/products/${this.editingProduct.id}` : '/products';
            const method = this.editingProduct ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save product');
            }

            const result = await response.json();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
            modal.hide();
            
            // Show success message
            this.showAlert(
                `Product ${this.editingProduct ? 'updated' : 'created'} successfully!`, 
                'success'
            );
            
            // Refresh data
            await this.fetchData();
            
        } catch (error) {
            console.error('Error saving product:', error);
            this.showAlert(`Error: ${error.message}`, 'danger');
        }
    }

    loadCategoryCheckboxes() {
        const container = document.getElementById('productCategories');
        if (!container) return;

        if (this.categories.length === 0) {
            container.innerHTML = '<p class="text-muted">No categories available. Please create categories first.</p>';
            return;
        }

        container.innerHTML = this.categories.map(category => `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${category.id}" id="cat_${category.id}">
                <label class="form-check-label" for="cat_${category.id}">
                    ${category.name}
                    <small class="text-muted">(${category.products.length} products)</small>
                </label>
            </div>
        `).join('');
    }

    editProduct(id) {
        this.editingProduct = this.products.find(p => p.id === id);
        if (!this.editingProduct) return;

        // Fill form with product data
        document.getElementById('productId').value = this.editingProduct.id;
        document.getElementById('productName').value = this.editingProduct.name;
        document.getElementById('productSKU').value = this.editingProduct.sku;
        document.getElementById('productDescription').value = this.editingProduct.description || '';
        document.getElementById('productPrice').value = this.editingProduct.price;
        document.getElementById('productSalePrice').value = this.editingProduct.sale_price || '';
        document.getElementById('productStock').value = this.editingProduct.stock_quantity;
        document.getElementById('productStatus').value = this.editingProduct.is_active ? '1' : '0';

        // Select categories
        this.editingProduct.categories.forEach(category => {
            const checkbox = document.getElementById(`cat_${category.id}`);
            if (checkbox) checkbox.checked = true;
        });

        // Update modal title
        document.getElementById('productModalLabel').innerHTML = '<i class="fas fa-edit me-2"></i>Edit Product';
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }

    editCategory(id) {
        this.editingCategory = this.categories.find(c => c.id === id);
        if (!this.editingCategory) return;

        // Fill form with category data
        document.getElementById('categoryId').value = this.editingCategory.id;
        document.getElementById('categoryName').value = this.editingCategory.name;
        document.getElementById('categoryDescription').value = this.editingCategory.description || '';
        document.getElementById('categoryImage').value = this.editingCategory.image || '';
        document.getElementById('categoryStatus').value = this.editingCategory.is_active ? '1' : '0';

        // Update modal title
        document.getElementById('categoryModalLabel').innerHTML = '<i class="fas fa-edit me-2"></i>Edit Category';
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
        modal.show();
    }

    async deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        
        try {
            const response = await fetch(`/products/${id}`, { 
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (!response.ok) throw new Error('Failed to delete product');
            
            this.showAlert('Product deleted successfully!', 'success');
            await this.fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
            this.showAlert('Error deleting product', 'danger');
        }
    }

    async deleteCategory(id) {
        const category = this.categories.find(c => c.id === id);
        if (category && category.products.length > 0) {
            if (!confirm(`This category has ${category.products.length} products. Are you sure you want to delete it?`)) {
                return;
            }
        }
        
        if (!confirm('Are you sure you want to delete this category?')) return;
        
        try {
            const response = await fetch(`/categories/${id}`, { 
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (!response.ok) throw new Error('Failed to delete category');
            
            this.showAlert('Category deleted successfully!', 'success');
            await this.fetchData();
        } catch (error) {
            console.error('Error deleting category:', error);
            this.showAlert('Error deleting category', 'danger');
        }
    }

    resetCategoryForm() {
        document.getElementById('categoryForm').reset();
        document.getElementById('categoryId').value = '';
        document.getElementById('categoryModalLabel').innerHTML = '<i class="fas fa-tags me-2"></i>Add New Category';
        this.editingCategory = null;
    }

    resetProductForm() {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.getElementById('productModalLabel').innerHTML = '<i class="fas fa-box me-2"></i>Add New Product';
        
        // Uncheck all category checkboxes
        document.querySelectorAll('#productCategories input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        this.editingProduct = null;
    }

    renderData() {
        this.renderProducts();
        this.renderCategories();
        this.updateStats();
    }

    updateStats() {
        document.getElementById('totalProducts').textContent = this.products.length;
        document.getElementById('totalCategories').textContent = this.categories.length;
        document.getElementById('activeProducts').textContent = this.products.filter(p => p.is_active).length;
        document.getElementById('lowStock').textContent = this.products.filter(p => p.stock_quantity < 10).length;
    }

    renderProducts() {
        const container = document.getElementById('productsContainer');
        if (!container) return;

        if (this.products.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">No products found</h5>
                    <p class="text-muted">Create your first product to get started!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.products.map(product => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100 card-hover">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${product.name}</h5>
                            <span class="badge ${product.is_active ? 'bg-success' : 'bg-secondary'}">${product.is_active ? 'Active' : 'Inactive'}</span>
                        </div>
                        <p class="card-text text-muted small">${product.description || 'No description available'}</p>
                        <div class="mb-2">
                            <span class="badge bg-success fs-6 me-2">$${product.sale_price || product.price}</span>
                            ${product.sale_price ? `<span class="badge bg-light text-dark text-decoration-line-through">$${product.price}</span>` : ''}
                        </div>
                        <div class="small text-muted mb-2">
                            <div><strong>SKU:</strong> ${product.sku}</div>
                            <div><strong>Stock:</strong> <span class="${product.stock_quantity < 10 ? 'text-warning fw-bold' : ''}">${product.stock_quantity}</span></div>
                        </div>
                        <div class="mb-3">
                            ${product.categories.length > 0 ? 
                                product.categories.map(cat => `<span class="badge bg-primary me-1">${cat.name}</span>`).join('') : 
                                '<span class="badge bg-light text-muted">No categories</span>'
                            }
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-top-0 pt-0">
                        <div class="btn-group w-100" role="group">
                            <button class="btn btn-sm btn-outline-primary" onclick="app.editProduct(${product.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="app.deleteProduct(${product.id})">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderCategories() {
        const container = document.getElementById('categoriesContainer');
        if (!container) return;

        if (this.categories.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-tags fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">No categories found</h5>
                    <p class="text-muted">Create your first category to organize products!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.categories.map(category => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100 card-hover">
                    ${category.image ? `<img src="${category.image}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${category.name}">` : ''}
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${category.name}</h5>
                            <span class="badge ${category.is_active ? 'bg-success' : 'bg-secondary'}">${category.is_active ? 'Active' : 'Inactive'}</span>
                        </div>
                        <p class="card-text text-muted">${category.description || 'No description available'}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-info">${category.products.length} Product${category.products.length !== 1 ? 's' : ''}</span>
                            <small class="text-muted">Slug: ${category.slug}</small>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-top-0 pt-0">
                        <div class="btn-group w-100" role="group">
                            <button class="btn btn-sm btn-outline-primary" onclick="app.editCategory(${category.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="app.deleteCategory(${category.id})">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ProductManager();
});