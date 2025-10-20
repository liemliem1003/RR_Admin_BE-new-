// import { Router } from 'express';
// import { ProductController } from '../controllers/product.controller';
// import { authenticate } from '../middleware/auth.middleware';

// const router = Router();

// router.get('/', ProductController.getAll);
// router.get('/:id', ProductController.getById);
// router.post('/', authenticate, ProductController.create);
// router.put('/:id', authenticate, ProductController.update);
// router.delete('/:id', authenticate, ProductController.remove);

// export default router;

import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticate } from '../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// === Multer setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/products';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// === Routes ===

// Lấy tất cả sản phẩm
router.get('/', ProductController.getAll);

// Lấy chi tiết sản phẩm theo ID
router.get('/:id', ProductController.getById);

// 🟢 Tạo sản phẩm (có thể upload ảnh)
router.post('/', authenticate, upload.single('image_url'), (req, res, next) => {
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    req.body.image_url = `${baseUrl}/uploads/products/${req.file.filename}`;
  }

  ProductController.create(req, res, next);
});

// 🟡 Cập nhật sản phẩm (có thể upload ảnh)
router.put('/:id', authenticate, upload.single('image_url'), (req, res, next) => {
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    req.body.image_url = `${baseUrl}/uploads/products/${req.file.filename}`;
  }

  ProductController.update(req, res, next);
});

// 🗑️ Xóa sản phẩm
router.delete('/:id', authenticate, ProductController.remove);

export default router;
