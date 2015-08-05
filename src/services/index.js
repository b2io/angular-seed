import angular from 'angular';
import SampleService from './sample/sample.service';

const ServicesModule = angular.module('b2io.angular-seed.services', [])
  .factory('SampleService', SampleService);

export default ServicesModule;
