import { mount } from '@vue/test-utils';
import { useBooks } from '../../stores/useBooks';
import SearchBar from '../layout/SearchBar.vue';
import { createTestingPinia } from '@pinia/testing'


describe("SearchBar", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(SearchBar, {
            global: {
                plugins: [createTestingPinia()]
            }
        });
    })

    it("renders an icon", () => {
        // const wrapper = mount(SearchBar);
        expect(wrapper.find('i').exists()).toBe(true);
    })

    it("renders an input text", () => {
        expect(wrapper.find('input').exists()).toBe(true);
    })

    it("updates the value when input changes", async () => {
        await wrapper.find('input').setValue('Test Input');

        expect(wrapper.find('input').element.value).toBe('Test Input');
    })

    it("updates the searchInput in pinia store when input changes", async () => {
        await wrapper.find('input').setValue('Test Input');
        const store = useBooks();
        expect(store.inputSearch).toBe('Test Input');
    })

})