import { configure } from 'enzyme';
import Adaptar from 'enzyme-adapter-react-16';

global.fetch = require('jest-fetch-mock');

configure({
  adapter: new Adaptar(),
});

global.document.execCommand = jest.fn();
