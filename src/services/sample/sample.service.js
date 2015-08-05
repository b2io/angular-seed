function SampleService($timeout, $log) {
  'ngInject';

  function delayedLog(message) {
    $timeout(() => $log.info(`Delayed Log: ${message}`), 1000);
  }

  return {
    delayedLog,
  };
}

export default SampleService;
