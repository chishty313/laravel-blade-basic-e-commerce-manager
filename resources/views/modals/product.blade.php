<!-- Product Modal -->
<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="productModalLabel">
                    <i class="fas fa-box me-2"></i>Add New Product
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="productForm">
                <div class="modal-body">
                    <input type="hidden" id="productId" name="id">
                    
                    <!-- Basic Information -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <h6 class="border-bottom pb-2 mb-3">
                                <i class="fas fa-info-circle me-1"></i>Basic Information
                            </h6>
                        </div>
                        <div class="col-md-8">
                            <div class="mb-3">
                                <label for="productName" class="form-label">
                                    <i class="fas fa-tag me-1"></i>Product Name *
                                </label>
                                <input type="text" class="form-control" id="productName" name="name" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="productSKU" class="form-label">
                                    <i class="fas fa-barcode me-1"></i>SKU *
                                </label>
                                <input type="text" class="form-control" id="productSKU" name="sku" required>
                                <div class="form-text">Unique product identifier</div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="productDescription" class="form-label">
                                    <i class="fas fa-align-left me-1"></i>Description
                                </label>
                                <textarea class="form-control" id="productDescription" name="description" rows="3" 
                                          placeholder="Detailed product description..."></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pricing & Inventory -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <h6 class="border-bottom pb-2 mb-3">
                                <i class="fas fa-dollar-sign me-1"></i>Pricing & Inventory
                            </h6>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-3">
                                <label for="productPrice" class="form-label">
                                    <i class="fas fa-money-bill me-1"></i>Regular Price *
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="productPrice" name="price" 
                                           step="0.01" min="0" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-3">
                                <label for="productSalePrice" class="form-label">
                                    <i class="fas fa-percentage me-1"></i>Sale Price
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="productSalePrice" name="sale_price" 
                                           step="0.01" min="0">
                                </div>
                                <div class="form-text">Optional discounted price</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-3">
                                <label for="productStock" class="form-label">
                                    <i class="fas fa-warehouse me-1"></i>Stock Quantity
                                </label>
                                <input type="number" class="form-control" id="productStock" name="stock_quantity" 
                                       min="0" value="0">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-3">
                                <label for="productStatus" class="form-label">
                                    <i class="fas fa-toggle-on me-1"></i>Status
                                </label>
                                <select class="form-select" id="productStatus" name="is_active">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Categories -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <h6 class="border-bottom pb-2 mb-3">
                                <i class="fas fa-sitemap me-1"></i>Categories
                            </h6>
                            <div class="mb-3">
                                <label class="form-label">Select Categories</label>
                                <div id="productCategories" class="border rounded p-3" style="min-height: 100px; max-height: 200px; overflow-y: auto;">
                                    <!-- Categories checkboxes will be loaded here -->
                                </div>
                                <div class="form-text">Select one or more categories for this product</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-1"></i>Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save me-1"></i>Save Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>