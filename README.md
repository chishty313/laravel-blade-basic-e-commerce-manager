# Laravel E-commerce Product Management System

A professional e-commerce product management system built with Laravel 12, Bootstrap 5, and modern JavaScript. This system provides comprehensive CRUD operations for products and categories with a many-to-many relationship.

![Dashboard Preview](https://img.shields.io/badge/Laravel-12-red?style=for-the-badge&logo=laravel)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?style=for-the-badge&logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🚀 Features

### Core Functionality
- **Product Management**: Create, read, update, and delete products
- **Category Management**: Full CRUD operations for product categories
- **Many-to-Many Relationships**: Products can belong to multiple categories
- **Professional Dashboard**: Real-time statistics and intuitive interface
- **Responsive Design**: Mobile-friendly Bootstrap 5 UI
- **RESTful API**: Well-structured API endpoints with proper validation

### Advanced Features
- **Real-time Statistics**: Live dashboard with product counts and analytics
- **Stock Management**: Track inventory with low stock warnings
- **Image Support**: Category image integration
- **Professional Modals**: Clean, user-friendly forms
- **Success/Error Notifications**: Toast-style notifications
- **Form Validation**: Both client-side and server-side validation
- **Professional UI**: Modern, clean interface with intuitive navigation

## 🛠️ Technology Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: Blade Templates + Modern JavaScript (ES6+)
- **Styling**: Bootstrap 5.3 + Font Awesome 6
- **Database**: MySQL 8.0+
- **Build Tool**: Vite
- **Package Manager**: Composer + NPM

## 📋 Requirements

- PHP 8.2 or higher
- Composer 2.0+
- Node.js 16+ and NPM
- MySQL 8.0+
- Git

## 🔧 Installation

### 1. Clone Repository
```bash
git clone https://github.com/chishty313/laravel-blade-basic-e-commerce-manager.git
cd laravel-blade-basic-e-commerce-manager
```

### 2. Install Dependencies
```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 3. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database Configuration
Update your `.env` file with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_product_management
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 5. Database Setup
```bash
# Create database
mysql -u your_username -p
CREATE DATABASE ecommerce_product_management;
exit

# Run migrations
php artisan migrate
```

### 6. Build Assets
```bash
npm run build
# or for development
npm run dev
```

### 7. Start Development Server
```bash
php artisan serve
```

Visit `http://127.0.0.1:8000` to access the application.

## 📊 Database Schema

### Categories Table
| Field | Type | Description |
|-------|------|-------------|
| id | bigint | Primary key |
| name | varchar(255) | Category name |
| slug | varchar(255) | URL-friendly name |
| description | text | Category description |
| image | varchar(255) | Image URL |
| is_active | boolean | Status flag |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last update |

### Products Table
| Field | Type | Description |
|-------|------|-------------|
| id | bigint | Primary key |
| name | varchar(255) | Product name |
| slug | varchar(255) | URL-friendly name |
| description | text | Product description |
| price | decimal(10,2) | Regular price |
| sale_price | decimal(10,2) | Sale price |
| sku | varchar(255) | Stock keeping unit |
| stock_quantity | integer | Available stock |
| images | json | Product images array |
| is_active | boolean | Status flag |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last update |

### Category_Product Pivot Table
| Field | Type | Description |
|-------|------|-------------|
| id | bigint | Primary key |
| category_id | bigint | Foreign key to categories |
| product_id | bigint | Foreign key to products |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last update |

## 🔗 API Endpoints

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all categories |
| POST | `/categories` | Create new category |
| GET | `/categories/{id}` | Get specific category |
| PUT | `/categories/{id}` | Update category |
| DELETE | `/categories/{id}` | Delete category |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| POST | `/products` | Create new product |
| GET | `/products/{id}` | Get specific product |
| PUT | `/products/{id}` | Update product |
| DELETE | `/products/{id}` | Delete product |

## 🎯 Usage Examples

### Creating a Category via API
```bash
curl -X POST http://127.0.0.1:8000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "is_active": true
  }'
```

### Creating a Product via API
```bash
curl -X POST http://127.0.0.1:8000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15",
    "description": "Latest iPhone model",
    "price": 999.99,
    "sale_price": 899.99,
    "sku": "IPH15-001",
    "stock_quantity": 50,
    "is_active": true,
    "category_ids": [1]
  }'
```

## 📝 Project Structure

```
laravel-blade-basic-e-commerce-manager/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── CategoryController.php
│   │   └── ProductController.php
│   └── Models/
│       ├── Category.php
│       └── Product.php
├── database/
│   └── migrations/
│       ├── create_categories_table.php
│       ├── create_products_table.php
│       └── create_category_product_table.php
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   └── app.js
│   └── views/
│       ├── layouts/
│       │   └── app.blade.php
│       ├── modals/
│       │   ├── category.blade.php
│       │   └── product.blade.php
│       └── dashboard.blade.php
└── routes/
    └── web.php
```

## 🧪 Testing

### Manual Testing Steps

1. **Dashboard Access**
   - Visit `http://127.0.0.1:8000`
   - Verify dashboard loads with statistics

2. **Category Management**
   - Click "Add Category" button
   - Fill form and submit
   - Verify category appears in the grid
   - Test edit and delete functionality

3. **Product Management**
   - Click "Add Product" button
   - Fill form and select categories
   - Test price validation
   - Verify product appears with correct categories

4. **API Testing**
   - Use Postman or curl to test API endpoints
   - Verify CRUD operations work correctly
   - Test validation rules

## 🚀 Deployment

### Production Setup
1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure proper database credentials
4. Run `npm run build` for optimized assets
5. Set up proper web server (Apache/Nginx)

### Security Considerations
- Ensure proper file permissions
- Use HTTPS in production
- Configure proper CORS settings
- Implement rate limiting if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/chishty313/laravel-blade-basic-e-commerce-manager/issues) page
2. Create a new issue if your problem isn't listed
3. Provide detailed information about your environment and the issue

## 🙏 Acknowledgments

- Laravel Framework
- Bootstrap Team
- Font Awesome
- All contributors and supporters

---

**Built with ❤️ using Laravel 12 and Bootstrap 5**
