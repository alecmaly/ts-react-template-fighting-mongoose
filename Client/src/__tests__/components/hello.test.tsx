import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';


import Hello from '../../components/hello';





describe('App', () => {
  it('should render a <h1 />', () => {
    const wrapper = mount(<Hello compiler='TypeScript' framework='React' />);

    expect(wrapper.find('h1').text()).toBe("Hello from TypeScript and React!");
  });
});
