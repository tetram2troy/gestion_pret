'use strict';

describe('Service: amortissement', function () {

  // load the service's module
  beforeEach(module('gestionPretApp'));

  // instantiate service
  var amortissement;
  beforeEach(inject(function (_amortissement_) {
    amortissement = _amortissement_;
  }));

  it('should do something', function () {
    expect(!!amortissement).toBe(true);
  });

});
