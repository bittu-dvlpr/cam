module.exports = (route) =>
  `
import { Router } from 'express';

const router = Router();

router.get('/${route}', (req, res) => res.json({message: 'OK'}));
router.get('/${route}/:id', (req, res) => res.json({message: 'OK'}));
router.post('/${route}', (req, res) => res.json({message: 'OK'}));
router.delete('/${route}/:id', (req, res) => res.json({message: 'OK'}));

export { router };
`;
