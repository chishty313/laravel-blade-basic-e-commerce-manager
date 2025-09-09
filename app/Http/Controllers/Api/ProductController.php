<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('categories')->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'sku' => 'required|string|unique:products',
            'stock_quantity' => 'integer|min:0',
            'images' => 'nullable|array',
            'is_active' => 'boolean',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id'
        ]);

        $product = Product::create($request->except('category_ids'));
        
        if ($request->has('category_ids')) {
            $product->categories()->sync($request->category_ids);
        }

        return response()->json($product->load('categories'), Response::HTTP_CREATED);
    }

    public function show(Product $product)
    {
        return response()->json($product->load('categories'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'sku' => 'string|unique:products,sku,' . $product->id,
            'stock_quantity' => 'integer|min:0',
            'images' => 'nullable|array',
            'is_active' => 'boolean',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id'
        ]);

        $product->update($request->except('category_ids'));
        
        if ($request->has('category_ids')) {
            $product->categories()->sync($request->category_ids);
        }

        return response()->json($product->load('categories'));
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}