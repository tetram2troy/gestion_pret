'use strict';

describe('Service: pretcalculs', function () {

  // load the service's module
  beforeEach(module('gestionPretApp'));

  // instantiate service
  var pretcalculs;
  beforeEach(inject(function (_pretcalculs_) {
    pretcalculs = _pretcalculs_;
  }));

  it('should do something', function () {
    expect(!!pretcalculs).toBe(true);
  });

});
