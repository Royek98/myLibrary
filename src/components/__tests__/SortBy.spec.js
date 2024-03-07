import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import SortBy from '../layout/SortBy.vue';

describe("SortBy", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(SortBy, {
            global: {
                plugins: [createTestingPinia()]
            }
        });
    })

    it("renders a paragraph", () => {
        expect(wrapper.get('p').exists()).toBe(true);
        expect(wrapper.get('p').text()).toEqual("Sort By:");
    })


    it("renders a list of sort options", () => {
        const list = wrapper.findAll('li');
        expect(list.length).toEqual(3);
    })

})