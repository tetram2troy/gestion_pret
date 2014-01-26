'use strict';

describe('Service: pretStorage', function () {

  // load the service's module
  beforeEach(module('gestionPretApp'));

  // instantiate service
  var pretStorage;
  beforeEach(inject(function (_pretStorage_) {
    pretStorage = _pretStorage_;
  }));

  it('should do something', function () {
    expect(!!pretStorage).toBe(true);
  });

});
