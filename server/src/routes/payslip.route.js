import express from 'express';
import * as payslipService from '../services/payslip.service';

const router = express.Router();

/**
 * @route   post /api/payslip
 * @desc    Add a payslip
 * @access  Private
 */
router.post('/', async (req, res, next) => {
  const data = req.body;

  // Send data to service
  try {
    const result = await payslipService.createPayslip(data);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(error.status).json(error.data);
  }
});

export default router;
