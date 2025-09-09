import './bootstrap';

// Import Bootstrap JavaScript
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
        try {
            await this.fetchData();
            this.bindEvents();
            this.updateStats();
        } catch (error) {
            console.error('Initialization error:', error);
            this.showAlert('Failed to initialize application', 'danger');
        }
    }

    async fetchData() {
        try {
            console.log('Fetching data...');
            
            const [productsRes, categoriesRes] = await Promise.all([
                fetch('/api/products', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }),
                fetch('/api/categories', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
            ]);
            
            console.log('Products response status:', productsRes.status);
            console.log('Categories response status:', categoriesRes.status);
            
            if (!productsRes.ok || !categoriesRes.ok) {
                throw new Error('Failed to fetch data from server');
            }
            
            this.products = await productsRes.json();
            this.categories = await categoriesRes.json();
            
            console.log('Products loaded:', this.products.length);
            console.log('Categories loaded:', this.categories.length);
            
            this.renderData();
            this.loadCategoryCheckboxes();
        } catch (error) {
            console.error('Error fetching data:', error);
            this.showAlert('Error loading data: ' + error.message, 'danger');
        }
    }

    bindEvents() {
        // Category form submission
        const categoryForm = document.getElementById('categoryForm');
        if (categoryForm) {
            categoryForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveCategory();
            });
        }

        // Product form submission
        const productForm = document.getElementById('productForm');
        if (productForm) {
            productForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveProduct();
            });
        }

        // Reset forms when modals are closed
        const categoryModal = document.getElementById('categoryModal');
        if (categoryModal) {
            categoryModal.addEventListener('hidden.bs.modal', () => {
                this.resetCategoryForm();
            });
        }

        const productModal = document.getElementById('productModal');
        if (productModal) {
            productModal.addEventListener('hidden.bs.modal', () => {
                this.resetProductForm();
            });
        }

        // Auto-generate slug for categories
        const categoryName = document.getElementById('categoryName');
        const categorySlug = document.getElementById('categorySlug');
        if (categoryName && categorySlug) {
            categoryName.addEventListener('input', (e) => {
                if (!this.editingCategory) {
                    categorySlug.value = this.generateSlug(e.target.value);
                }
            });
        }
    }

    generateSlug(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    renderData() {
        this.renderProducts();
        this.renderCategories();
        this.updateStats();
    }

    updateStats() {
        const totalProductsEl = document.getElementById('totalProducts');
        const totalCategoriesEl = document.getElementById('totalCategories');
        const activeProductsEl = document.getElementById('activeProducts');
        const lowStockEl = document.getElementById('lowStock');

        if (totalProductsEl) totalProductsEl.textContent = this.products.length;
        if (totalCategoriesEl) totalCategoriesEl.textContent = this.categories.length;
        if (activeProductsEl) activeProductsEl.textContent = this.products.filter(p => p.is_active).length;
        if (lowStockEl) lowStockEl.textContent = this.products.filter(p => p.stock_quantity < 10).length;
    }

    renderProducts() {
        const container = document.getElementById('productsContainer');
        if (!container) {
            console.error('Products container not found');
            return;
        }

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
                            <h5 class="card-title mb-0">${product.name || 'Unnamed Product'}</h5>
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
                            ${product.categories && product.categories.length > 0 ? 
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
        if (!container) {
            console.error('Categories container not found');
            return;
        }

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
                            <h5 class="card-title mb-0">${category.name || 'Unnamed Category'}</h5>
                            <span class="badge ${category.is_active ? 'bg-success' : 'bg-secondary'}">${category.is_active ? 'Active' : 'Inactive'}</span>
                        </div>
                        <p class="card-text text-muted">${category.description || 'No description available'}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-info">${category.products ? category.products.length : 0} Product${(category.products && category.products.length !== 1) ? 's' : ''}</span>
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
                    <small class="text-muted">(${category.products ? category.products.length : 0} products)</small>
                </label>
            </div>
        `).join('');
    }

    async saveCategory() {
        const form = document.getElementById('categoryForm');
        const formData = new FormData(form);
        
        const categoryData = {
            name: formData.get('name'),
            slug: formData.get('slug') || this.generateSlug(formData.get('name')),
            description: formData.get('description'),
            image: formData.get('image'),
            is_active: formData.has('is_active')
        };

        try {
            const url = this.editingCategory ? `/api/categories/${this.editingCategory.id}` : '/api/categories';
            const method = this.editingCategory ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(categoryData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save category');
            }

            const savedCategory = await response.json();
            
            this.showAlert(
                this.editingCategory ? 'Category updated successfully!' : 'Category created successfully!', 
                'success'
            );

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
            modal.hide();

            // Refresh data
            await this.fetchData();

        } catch (error) {
            console.error('Error saving category:', error);
            this.showAlert('Error saving category: ' + error.message, 'danger');
        }
    }

    async saveProduct() {
        const form = document.getElementById('productForm');
        const formData = new FormData(form);
        
        // Get selected categories
        const selectedCategories = Array.from(document.querySelectorAll('#productCategories input:checked'))
            .map(checkbox => parseInt(checkbox.value));

        const productData = {
            name: formData.get('name'),
            sku: formData.get('sku'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            sale_price: formData.get('sale_price') ? parseFloat(formData.get('sale_price')) : null,
            stock_quantity: parseInt(formData.get('stock_quantity')) || 0,
            is_active: formData.has('is_active'),
            category_ids: selectedCategories
        };

        try {
            const url = this.editingProduct ? `/api/products/${this.editingProduct.id}` : '/api/products';
            const method = this.editingProduct ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save product');
            }

            const savedProduct = await response.json();
            
            this.showAlert(
                this.editingProduct ? 'Product updated successfully!' : 'Product created successfully!', 
                'success'
            );

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
            modal.hide();

            // Refresh data
            await this.fetchData();

        } catch (error) {
            console.error('Error saving product:', error);
            this.showAlert('Error saving product: ' + error.message, 'danger');
        }
    }

    async deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        
        try {
            const response = await fetch(`/api/products/${id}`, { 
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
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
        if (category && category.products && category.products.length > 0) {
            if (!confirm(`This category has ${category.products.length} products. Are you sure you want to delete it?`)) {
                return;
            }
        }
        
        if (!confirm('Are you sure you want to delete this category?')) return;
        
        try {
            const response = await fetch(`/api/categories/${id}`, { 
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
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

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;

        this.editingProduct = product;
        
        // Populate form
        document.getElementById('productName').value = product.name;
        document.getElementById('productSku').value = product.sku;
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productSalePrice').value = product.sale_price || '';
        document.getElementById('productStock').value = product.stock_quantity;
        document.getElementById('productActive').checked = product.is_active;

        // Select categories
        document.querySelectorAll('#productCategories input[type="checkbox"]').forEach(checkbox => {
            const categoryId = parseInt(checkbox.value);
            checkbox.checked = product.categories.some(cat => cat.id === categoryId);
        });

        // Update modal title
        document.getElementById('productModalLabel').innerHTML = '<i class="fas fa-edit me-2"></i>Edit Product';

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }

    editCategory(id) {
        const category = this.categories.find(c => c.id === id);
        if (!category) return;

        this.editingCategory = category;
        
        // Populate form
        document.getElementById('categoryName').value = category.name;
        document.getElementById('categorySlug').value = category.slug;
        document.getElementById('categoryDescription').value = category.description || '';
        document.getElementById('categoryImage').value = category.image || '';
        document.getElementById('categoryActive').checked = category.is_active;

        // Update modal title
        document.getElementById('categoryModalLabel').innerHTML = '<i class="fas fa-edit me-2"></i>Edit Category';

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
        modal.show();
    }

    resetCategoryForm() {
        const form = document.getElementById('categoryForm');
        if (form) form.reset();
        this.editingCategory = null;
        document.getElementById('categoryModalLabel').innerHTML = '<i class="fas fa-tags me-2"></i>Add Category';
    }

    resetProductForm() {
        const form = document.getElementById('productForm');
        if (form) form.reset();
        this.editingProduct = null;
        document.getElementById('productModalLabel').innerHTML = '<i class="fas fa-box me-2"></i>Add Product';
        
        // Uncheck all categories
        document.querySelectorAll('#productCategories input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    getCSRFToken() {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : '';
    }

    showAlert(message, type) {
        console.log(`Alert (${type}):`, message);
        
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
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.app = new ProductManager();
});