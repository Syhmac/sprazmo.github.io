var express = require('express');
var createError = require('http-errors');
var Car = require('../models/Car');

var router = express.Router();

function render(res, page, locals) {
  res.render('layout', Object.assign({ page: page }, locals));
}

function carParams(body) {
  return body.car && typeof body.car === 'object' ? body.car : body;
}

router.get('/', function(req, res) {
  render(res, 'cars/index', {
    title: 'Car List',
    bodyClass: 'index',
    cars: Car.findAll(),
  });
});

router.get('/create', function(req, res) {
  render(res, 'cars/create', {
    title: 'Add Car',
    bodyClass: 'edit',
    car: new Car(),
  });
});

router.post('/create', function(req, res) {
  var car = Car.fromArray(carParams(req.body));
  car.save();

  res.redirect('/cars');
});

router.get('/:id', function(req, res, next) {
  var car = Car.find(Number(req.params.id));
  if (!car) {
    return next(createError(404, 'Missing car'));
  }

  render(res, 'cars/show', {
    title: car.getManufacturer() + ' ' + car.getModel() + ' (' + car.getId() + ')',
    bodyClass: 'show',
    car: car,
  });
});

router.get('/:id/edit', function(req, res, next) {
  var car = Car.find(Number(req.params.id));
  if (!car) {
    return next(createError(404, 'Missing car'));
  }

  render(res, 'cars/edit', {
    title: 'Edit Car ' + car.getManufacturer() + ' ' + car.getModel() + ' (' + car.getId() + ')',
    bodyClass: 'edit',
    car: car,
  });
});

router.post('/:id/edit', function(req, res, next) {
  var car = Car.find(Number(req.params.id));
  if (!car) {
    return next(createError(404, 'Missing car'));
  }

  car.fill(carParams(req.body));
  car.save();

  res.redirect('/cars');
});

router.post('/:id/delete', function(req, res, next) {
  var car = Car.find(Number(req.params.id));
  if (!car) {
    return next(createError(404, 'Missing car'));
  }

  car.delete();

  res.redirect('/cars');
});

module.exports = router;
