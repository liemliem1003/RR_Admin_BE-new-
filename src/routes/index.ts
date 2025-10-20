import { Router } from 'express';
import authRoutes from './auth.routes';
import orderRoutes from './order.routes';
import storeRoutes from './store.routes';
import productRoutes from './product.routes';
import menuRoutes from './menu.routes';
import categoryRoutes from './category.routes';
import voucherRoutes from './voucher.routes';
import loyaltyRoutes from './loyalty.routes';
import paymentRoutes from './payment.routes';
import deliveryRoutes from './delivery.routes';
import regionRoutes from './region.routes';
import menuItemRoutes from './menuItem.routes';
import userAccountRoutes from './userAccount.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/stores', storeRoutes);
router.use('/products', productRoutes);
router.use('/menus', menuRoutes);
router.use('/categories', categoryRoutes);
router.use('/vouchers', voucherRoutes);
router.use('/loyalty', loyaltyRoutes);
router.use('/payments', paymentRoutes);
router.use('/delivery', deliveryRoutes);
router.use('/region', regionRoutes);
router.use('/menu-items', menuItemRoutes);
router.use('/user', userAccountRoutes);

export default router;
