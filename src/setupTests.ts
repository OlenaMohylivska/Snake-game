import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { jest } from '@jest/globals';

Enzyme.configure({ adapter: new Adapter() });
