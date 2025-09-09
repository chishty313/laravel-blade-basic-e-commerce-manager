<!-- Category Modal -->
<div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-success text-white">
                <h5 class="modal-title" id="categoryModalLabel">
                    <i class="fas fa-tags me-2"></i>Add New Category
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="categoryForm">
                <div class="modal-body">
                    <input type="hidden" id="categoryId" name="id">
                    
                    <div class="row">
                        <div class="col-md-8">
                            <div class="mb-3">
                                <label for="categoryName" class="form-label">
                                    <i class="fas fa-tag me-1"></i>Category Name *
                                </label>
                                <input type="text" class="form-control" id="categoryName" name="name" required>
                                <div class="form-text">Enter a unique category name</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="categoryStatus" class="form-label">
                                    <i class="fas fa-toggle-on me-1"></i>Status
                                </label>
                                <select class="form-select" id="categoryStatus" name="is_active">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="categoryDescription" class="form-label">
                            <i class="fas fa-align-left me-1"></i>Description
                        </label>
                        <textarea class="form-control" id="categoryDescription" name="description" rows="3" 
                                  placeholder="Brief description of this category..."></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="categoryImage" class="form-label">
                            <i class="fas fa-image me-1"></i>Category Image URL
                        </label>
                        <input type="url" class="form-control" id="categoryImage" name="image" 
                               placeholder="https://example.com/image.jpg">
                        <div class="form-text">Optional: Enter a URL for category image</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-1"></i>Cancel
                    </button>
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save me-1"></i>Save Category
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>