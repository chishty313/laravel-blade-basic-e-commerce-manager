<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Electronics',
                'description' => 'Latest electronic devices, gadgets, and accessories including smartphones, laptops, and smart home devices.',
                'image' => 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Clothing & Fashion',
                'description' => 'Trendy clothing, footwear, and fashion accessories for men, women, and children.',
                'image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Home & Garden',
                'description' => 'Home improvement, furniture, garden tools, and decorative items for your living space.',
                'image' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Sports & Fitness',
                'description' => 'Sports equipment, fitness gear, outdoor activities, and health-related products.',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Books & Media',
                'description' => 'Books, magazines, digital media, educational materials, and entertainment content.',
                'image' => 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
                'is_active' => true,
            ],
            [
                'name' => 'Health & Beauty',
                'description' => 'Personal care, cosmetics, skincare, wellness products, and health supplements.',
                'image' => 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}