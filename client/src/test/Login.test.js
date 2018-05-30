import React from 'react';
import Login from '../js/components/Login';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'

describe('Login Component', () => {   //always gives errors
    const mockStore = configureStore()
    let store, container

    beforeEach(() => {
        store = mockStore();
        container = shallow(<Login store={store} />)
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1)
    });
});