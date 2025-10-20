import { Router } from 'express';
import { RegionController } from '../controllers/region.controller';
import { authenticate } from '../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// === Multer setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/regions';
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

// Lấy danh sách tất cả vùng
router.get('/', authenticate, RegionController.getAll);

// Lấy chi tiết vùng theo ID
router.get('/:id', authenticate, RegionController.getById);

// 🟢 Tạo mới vùng (có thể upload ảnh)
router.post('/', authenticate, upload.single('img'), (req, res, next) => {
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    req.body.img = `${baseUrl}/uploads/regions/${req.file.filename}`;
  }

  if (req.body.level) req.body.level = Number(req.body.level);
  if (req.body.parent_id) req.body.parent_id = Number(req.body.parent_id);

  RegionController.create(req, res, next);
});

// 🟡 Cập nhật vùng (có thể upload ảnh)
router.put('/:id', authenticate, upload.single('img'), (req, res, next) => {
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    req.body.img = `${baseUrl}/uploads/regions/${req.file.filename}`;
  }

  if (req.body.level) req.body.level = Number(req.body.level);
  if (req.body.parent_id) req.body.parent_id = Number(req.body.parent_id);

  RegionController.update(req, res, next);
});

// Xóa vùng
router.delete('/:id', authenticate, RegionController.remove);

// Lấy danh sách vùng theo cấp độ
router.get('/level/:level', authenticate, RegionController.getByLevel);

// Lấy danh sách vùng con theo parent_id
router.get('/children/:parentId', authenticate, RegionController.getChildren);

export default router;
