import { mount } from "@vue/test-utils";
import BaseDialog from "../layout/BaseDialog.vue";
import BookEdit from "../BookEdit.vue";
import { createTestingPinia } from "@pinia/testing";

describe("BookEdit", async () => {
    const mockRoute = {
        params: {
            bookId: '1',
        },
    };

    const mockRouter = {
        push: vi.fn(),
    };

    const wrapper = mount(BookEdit, {
        global: {
            props: {
                show: true
            },
            plugins: [createTestingPinia()],
            mocks: {
                $route: mockRoute,
                $router: mockRouter
            },
            stubs: {
                teleport: true,
                routerLink: true
            }
        },
    })
    await wrapper.vm.$nextTick(); // wait for teleport
    const baseDialog = wrapper.getComponent(BaseDialog).get('dialog');

    it("renders all inputs", () => {
        // book with id 1 has 5 input[type="text"]: title, author and 3 chapters (title) 
        expect(baseDialog.findAll('input[type="text"]').length).toEqual(5);

        // maxPages and 3 chapters (pageNumber)
        expect(baseDialog.findAll('input[type="number"]').length).toEqual(4);
        
        // releaseDate
        expect(baseDialog.findAll('input[type="date"]').length).toEqual(1);

        // description
        expect(baseDialog.get('textarea').exists()).toBe(true);
        
        // number of all available genres
        expect(baseDialog.findAll('input[type="checkbox"]').length).toEqual(11);
    
        // file
        expect(baseDialog.find('h2').text()).toContain('File');

        // poster
        expect(baseDialog.find('img').exists()).toBe(true);
    })
})