import React from 'react';
import { shallow } from 'enzyme';

it('renders', () => {
  const wrapper = shallow(<div>
    <h1>Hello, Enzyme!</h1>
  </div>)
  expect(wrapper.find('h1').text()).toMatch(/Hello, Enzyme/)
})


// snapshot test

// it('renders snapshots, too', () => {
//   const wrapper = shallow(<div>
//     <h1>Hello, Enzyme!</h1>
//   </div>)
//   expect(wrapper).toMatchSnapshot()
// })
