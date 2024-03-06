import { mount } from '@vue/test-utils';
import { useBooks } from '../../stores/useBooks';
import GenreCheckbox from "../layout/GenreCheckbox.vue";
import GenresSelector from "../layout/GenresSelector.vue";
import { createTestingPinia } from '@pinia/testing'

describe("GenresSelector", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(GenresSelector, {
            global: {
                plugins: [createTestingPinia()]
            }
        });
    })

    it("renders a hidden checkboxes and paragraph to click", () => {
        const button = wrapper.get('.genreButton')
        expect(button.exists()).toBe(true);
        expect(button.text()).toEqual("Genres:");
        const checkboxes = wrapper.findAllComponents(GenreCheckbox);
        expect(checkboxes.length).toEqual(0);
    })

    it("simulate click on paragraph", () => {
        const button = wrapper.get('.genreButton')
        expect(wrapper.vm.show).toBe(false)
        button.trigger('click')
        expect(wrapper.vm.show).toBe(true)
    })

    it("display list of genres from pinia as checkboxes", async () => {
        let checkboxes = wrapper.findAllComponents(GenreCheckbox);
        const store = useBooks()

        expect(checkboxes.length).toEqual(0);

        await wrapper.setData({ show: true });
        checkboxes = wrapper.findAllComponents(GenreCheckbox);

        expect(checkboxes.length).toEqual(store.genres.length);
    })
})