<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            // Electronics
            [
                'name' => 'iPhone 15 Pro',
                'description' => 'Latest Apple smartphone with A17 Pro chip, advanced camera system, and titanium design.',
                'price' => 1199.99,
                'sale_price' => 1099.99,
                'sku' => 'IPH15PRO-001',
                'stock_quantity' => 45,
                'is_active' => true,
                'category_ids' => [1],
            ],
            [
                'name' => 'MacBook Air M3',
                'description' => '13-inch laptop with M3 chip, 8GB RAM, 256GB SSD. Perfect for everyday computing.',
                'price' => 1299.99,
                'sale_price' => null,
                'sku' => 'MBA-M3-001',
                'stock_quantity' => 28,
                'is_active' => true,
                'category_ids' => [1],
            ],
            [
                'name' => 'Samsung 55" 4K Smart TV',
                'description' => 'Ultra HD Smart TV with HDR10+, built-in streaming apps, and voice control.',
                'price' => 899.99,
                'sale_price' => 799.99,
                'sku' => 'SAM-TV55-001',
                'stock_quantity' => 15,
                'is_active' => true,
                'category_ids' => [1],
            ],
            
            // Clothing & Fashion
            [
                'name' => 'Premium Cotton T-Shirt',
                'description' => 'Comfortable 100% organic cotton t-shirt available in multiple colors and sizes.',
                'price' => 29.99,
                'sale_price' => 24.99,
                'sku' => 'TSHRT-COT-001',
                'stock_quantity' => 120,
                'is_active' => true,
                'category_ids' => [2],
            ],
            [
                'name' => 'Leather Business Shoes',
                'description' => 'Handcrafted genuine leather dress shoes perfect for business and formal occasions.',
                'price' => 189.99,
                'sale_price' => null,
                'sku' => 'SHOE-LEA-001',
                'stock_quantity' => 35,
                'is_active' => true,
                'category_ids' => [2],
            ],
            [
                'name' => 'Designer Handbag',
                'description' => 'Elegant designer handbag with premium materials and sophisticated styling.',
                'price' => 299.99,
                'sale_price' => 249.99,
                'sku' => 'BAG-DES-001',
                'stock_quantity' => 22,
                'is_active' => true,
                'category_ids' => [2],
            ],
            
            // Home & Garden
            [
                'name' => 'Smart Home Security Camera',
                'description' => 'WiFi-enabled security camera with night vision, motion detection, and mobile app.',
                'price' => 149.99,
                'sale_price' => 129.99,
                'sku' => 'CAM-SEC-001',
                'stock_quantity' => 67,
                'is_active' => true,
                'category_ids' => [1, 3], // Electronics + Home & Garden
            ],
            [
                'name' => 'Ergonomic Office Chair',
                'description' => 'Professional office chair with lumbar support, adjustable height, and premium materials.',
                'price' => 399.99,
                'sale_price' => 349.99,
                'sku' => 'CHAIR-OFF-001',
                'stock_quantity' => 18,
                'is_active' => true,
                'category_ids' => [3],
            ],
            
            // Sports & Fitness
            [
                'name' => 'Professional Yoga Mat',
                'description' => 'Non-slip yoga mat made from eco-friendly materials, perfect for all yoga practices.',
                'price' => 59.99,
                'sale_price' => null,
                'sku' => 'YOGA-MAT-001',
                'stock_quantity' => 85,
                'is_active' => true,
                'category_ids' => [4, 6], // Sports & Fitness + Health & Beauty
            ],
            [
                'name' => 'Bluetooth Sports Headphones',
                'description' => 'Wireless earbuds designed for sports with sweat resistance and secure fit.',
                'price' => 129.99,
                'sale_price' => 99.99,
                'sku' => 'HEAD-SPT-001',
                'stock_quantity' => 42,
                'is_active' => true,
                'category_ids' => [1, 4], // Electronics + Sports & Fitness
            ],
            
            // Books & Media
            [
                'name' => 'Complete Web Development Guide',
                'description' => 'Comprehensive guide to modern web development including HTML, CSS, JavaScript, and frameworks.',
                'price' => 49.99,
                'sale_price' => 39.99,
                'sku' => 'BOOK-WEB-001',
                'stock_quantity' => 95,
                'is_active' => true,
                'category_ids' => [5],
            ],
            [
                'name' => 'Productivity Planner 2024',
                'description' => 'Daily planner designed to boost productivity with goal setting and time management features.',
                'price' => 24.99,
                'sale_price' => null,
                'sku' => 'PLAN-2024-001',
                'stock_quantity' => 156,
                'is_active' => true,
                'category_ids' => [5],
            ],
            
            // Health & Beauty
            [
                'name' => 'Organic Skincare Set',
                'description' => 'Complete skincare routine with organic ingredients including cleanser, toner, and moisturizer.',
                'price' => 89.99,
                'sale_price' => 74.99,
                'sku' => 'SKIN-ORG-001',
                'stock_quantity' => 38,
                'is_active' => true,
                'category_ids' => [6],
            ],
            [
                'name' => 'Digital Scale & Health Monitor',
                'description' => 'Smart scale that tracks weight, BMI, body fat, and syncs with health apps.',
                'price' => 79.99,
                'sale_price' => 69.99,
                'sku' => 'SCALE-DIG-001',
                'stock_quantity' => 29,
                'is_active' => true,
                'category_ids' => [1, 6], // Electronics + Health & Beauty
            ],
            
            // Low stock items for testing
            [
                'name' => 'Limited Edition Watch',
                'description' => 'Exclusive timepiece with premium materials and sophisticated design.',
                'price' => 599.99,
                'sale_price' => null,
                'sku' => 'WATCH-LIM-001',
                'stock_quantity' => 3, // Low stock
                'is_active' => true,
                'category_ids' => [2],
            ],
        ];

        foreach ($products as $productData) {
            $categoryIds = $productData['category_ids'];
            unset($productData['category_ids']);
            
            $product = Product::create($productData);
            $product->categories()->sync($categoryIds);
        }
    }
}