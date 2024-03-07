import { mount } from "@vue/test-utils";
import HomeMenu from "../layout/HomeMenu.vue";
import TheLogo from "../layout/TheLogo.vue";
import SearchBar from "../layout/SearchBar.vue";
import GenresSelector from "../layout/GenresSelector.vue";
import SortBy from "../layout/SortBy.vue";
import { createTestingPinia } from "@pinia/testing";

describe("HomeMenu", () => {
    let wrapper;
    const mockRouter = {
        push: vi.fn()
    }
    
    beforeEach(() => {
        wrapper = mount(HomeMenu, {
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $router: mockRouter
                },
                stubs: {
                    routerLink: true
                }
            }
        });
    })
    

    it("renders the logo", () => {
        expect(wrapper.getComponent(TheLogo).exists()).toBe(true);
    })

    it("renders search bar", () => {
        expect(wrapper.getComponent(SearchBar).exists()).toBe(true);
    })

    it("renders genres selector", () => {
        expect(wrapper.getComponent(GenresSelector).exists()).toBe(true);
    })

    it("renders sort by", () => {
        expect(wrapper.getComponent(SortBy).exists()).toBe(true);
    })

    it("renders add new book button", () => {
        expect(wrapper.get('.add').exists()).toBe(true);
    })
})