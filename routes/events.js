/*
  Rutas de eventos /Events
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { jwtValidator } = require('../middlewares/jwtValidator')
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

router.use( jwtValidator )

router.get(
  '/',
  getEvents
)

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom( isDate ),
    check('end', 'End date is required').custom(isDate),
    fieldsValidator,
  ],
  createEvent
)

router.put(
  '/:id',
  updateEvent
)

router.delete(
  '/:id',
  deleteEvent
)

module.exports = router;