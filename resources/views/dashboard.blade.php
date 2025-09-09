@extends('layouts.app')

@section('title', 'Product Management Dashboard')

@section('content')
<div class="row mb-4">
    <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h1 class="h3 mb-0">
                    <i class="fas fa-boxes me-2 text-primary"></i>Product Management Dashboard
                </h1>
                <p class="text-muted">Manage your e-commerce products and categories</p>
            </div>
            <div>
                <button class="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#categoryModal">
                    <i class="fas fa-plus me-1"></i>Add Category
                </button>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal">
                    <i class="fas fa-plus me-1"></i>Add Product
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Stats Cards -->
<div class="row mb-4">
    <div class="col-md-3">
        <div class="card bg-primary text-white">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">Total Products</h5>
                        <h2 class="mb-0" id="totalProducts">0</h2>
                    </div>
                    <div class="align-self-center">
                        <i class="fas fa-box fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card bg-success text-white">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">Categories</h5>
                        <h2 class="mb-0" id="totalCategories">0</h2>
                    </div>
                    <div class="align-self-center">
                        <i class="fas fa-tags fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card bg-info text-white">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">Active Products</h5>
                        <h2 class="mb-0" id="activeProducts">0</h2>
                    </div>
                    <div class="align-self-center">
                        <i class="fas fa-check-circle fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card bg-warning text-white">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">Low Stock</h5>
                        <h2 class="mb-0" id="lowStock">0</h2>
                    </div>
                    <div class="align-self-center">
                        <i class="fas fa-exclamation-triangle fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Tabs -->
<div class="card">
    <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab">
                    <i class="fas fa-box me-1"></i>Products
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab">
                    <i class="fas fa-tags me-1"></i>Categories
                </button>
            </li>
        </ul>
    </div>
    <div class="card-body">
        <div class="tab-content">
            <!-- Products Tab -->
            <div class="tab-pane fade show active" id="products" role="tabpanel">
                <div class="row" id="productsContainer">
                    <!-- Products will be loaded here -->
                </div>
            </div>
            
            <!-- Categories Tab -->
            <div class="tab-pane fade" id="categories" role="tabpanel">
                <div class="row" id="categoriesContainer">
                    <!-- Categories will be loaded here -->
                </div>
            </div>
        </div>
    </div>
</div>

@include('modals.category')
@include('modals.product')
@endsection