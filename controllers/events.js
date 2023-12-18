const { response } = require('express');
const Event = require('../models/eventModel');

const getEvents = async (req, res = response) => {

  const events = await Event.find().populate('user', 'name');

  try {
    return res.json({
      ok: true,
      events
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error'
    })
  }
}

const createEvent = async (req, res = response) => {

  const event = new Event(req.body)

  try {

    event.user = req.uid;
    const eventSave = await event.save()

    res.json({
      ok: true,
      event: eventSave
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error'
    });
  }
}

const updateEvent = async (req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: 'Note not found'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Not authorized'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.json({
      ok: true,
      event: eventUpdated
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error'
    })
  }
}

const deleteEvent = async (req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById( eventId )

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: 'Note not found'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Not authorized'
      })
    }

    await Event.findByIdAndDelete( eventId )

    res.json({ ok: true });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error'
    })
  }
}

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
};