import { shallowMount } from '@vue/test-utils';
import { useBooks } from '../../stores/useBooks';
import SearchBar from '../layout/SearchBar.vue';
import { createTestingPinia } from '@pinia/testing'


describe("SearchBar", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(SearchBar, {
            global: {
                plugins: [createTestingPinia()]
            }
        });
    })

    it("renders an icon", () => {
        // const wrapper = mount(SearchBar);
        expect(wrapper.get('i').exists()).toBe(true);
    })

    it("renders an input text", () => {
        expect(wrapper.get('input').exists()).toBe(true);
    })

    it("updates the value when input changes", async () => {
        await wrapper.get('input').setValue('Test Input');

        expect(wrapper.get('input').element.value).toBe('Test Input');
    })

    it("updates the searchInput in pinia store when input changes", async () => {
        await wrapper.get('input').setValue('Test Input');
        const store = useBooks();
        expect(store.inputSearch).toBe('Test Input');
    })

})