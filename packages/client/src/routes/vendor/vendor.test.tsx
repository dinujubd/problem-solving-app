
import React from 'react';
import { render } from '@testing-library/react';
import Vendor from './vendor';
import renderer from 'react-test-renderer';

// beforeAll(() => {
//     Object.defineProperty(window, "matchMedia", {
//         value: jest.fn(() => {
//             return {
//                 matches: true,
//                 addListener: jest.fn(),
//                 removeListener: jest.fn()
//             };
//         })
//     });
// });
test('<Vendor />', () => {
    const tree = renderer.create(<Vendor />).toJSON();
    expect(tree).toMatchSnapshot();
});