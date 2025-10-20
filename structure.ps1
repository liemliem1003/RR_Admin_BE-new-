# Path gốc
$base = "C:\Users\TGC\Desktop\Kayn Project\RR\BE"

# Danh sách thư mục
$folders = @(
    "$base\logs",
    "$base\node_modules",
    "$base\src",
    "$base\src\config",
    "$base\src\controllers",
    "$base\src\middleware",
    "$base\src\migrations",
    "$base\src\models",
    "$base\src\routes",
    "$base\src\seeders",
    "$base\src\services",
    "$base\src\tests",
    "$base\src\utils"
)

# Danh sách file
$files = @(
    "$base\.env",
    "$base\docker-compose.yml",
    "$base\Dockerfile",
    "$base\package.json",
    "$base\package-lock.json",
    "$base\tsconfig.json",
    "$base\README.md",
    "$base\project-structure.txt",
    "$base\logs\combined.log",
    "$base\logs\error.log",
    "$base\src\app.ts",
    "$base\src\server.ts",

    # config
    "$base\src\config\db.ts",
    "$base\src\config\env.ts",
    "$base\src\config\logger.ts",

    # controllers
    "$base\src\controllers\auth.controller.ts",
    "$base\src\controllers\order.controller.ts",
    "$base\src\controllers\store.controller.ts",
    "$base\src\controllers\product.controller.ts",
    "$base\src\controllers\menu.controller.ts",
    "$base\src\controllers\category.controller.ts",
    "$base\src\controllers\voucher.controller.ts",
    "$base\src\controllers\loyalty.controller.ts",
    "$base\src\controllers\payment.controller.ts",
    "$base\src\controllers\delivery.controller.ts",

    # middleware
    "$base\src\middleware\auth.middleware.ts",
    "$base\src\middleware\error.middleware.ts",
    "$base\src\middleware\validate.middleware.ts",

    # models
    "$base\src\models\Region.ts",
    "$base\src\models\Store.ts",
    "$base\src\models\Category.ts",
    "$base\src\models\Product.ts",
    "$base\src\models\Menu.ts",
    "$base\src\models\MenuItem.ts",
    "$base\src\models\UserAccount.ts",
    "$base\src\models\Order.ts",
    "$base\src\models\OrderItem.ts",
    "$base\src\models\PaymentLog.ts",
    "$base\src\models\Delivery.ts",
    "$base\src\models\Voucher.ts",
    "$base\src\models\VoucherStore.ts",
    "$base\src\models\VoucherCategory.ts",
    "$base\src\models\VoucherProduct.ts",
    "$base\src\models\VoucherUsage.ts",
    "$base\src\models\LoyaltyAccount.ts",
    "$base\src\models\LoyaltyTransaction.ts",
    "$base\src\models\RolePermission.ts",
    "$base\src\models\PosOrder.ts",
    "$base\src\models\IntegrationKey.ts",
    "$base\src\models\AuditLog.ts",

    # routes
    "$base\src\routes\index.ts",
    "$base\src\routes\auth.routes.ts",
    "$base\src\routes\order.routes.ts",
    "$base\src\routes\store.routes.ts",
    "$base\src\routes\product.routes.ts",
    "$base\src\routes\menu.routes.ts",
    "$base\src\routes\category.routes.ts",
    "$base\src\routes\voucher.routes.ts",
    "$base\src\routes\loyalty.routes.ts",
    "$base\src\routes\payment.routes.ts",
    "$base\src\routes\delivery.routes.ts",

    # services
    "$base\src\services\auth.service.ts",
    "$base\src\services\order.service.ts",
    "$base\src\services\store.service.ts",
    "$base\src\services\product.service.ts",
    "$base\src\services\menu.service.ts",
    "$base\src\services\category.service.ts",
    "$base\src\services\voucher.service.ts",
    "$base\src\services\loyalty.service.ts",
    "$base\src\services\payment.service.ts",
    "$base\src\services\delivery.service.ts",

    # utils
    "$base\src\utils\crypto.ts",
    "$base\src\utils\email.ts",
    "$base\src\utils\sms.ts",
    "$base\src\utils\time.ts"
)

# Tạo thư mục
foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
    }
}

# Tạo file rỗng
foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
    }
}

Write-Host "✅ Project structure created successfully at $base"
