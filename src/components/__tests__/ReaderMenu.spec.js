import { mount } from "@vue/test-utils";
import ReaderMenu from '../layout/ReaderMenu.vue';
import { createTestingPinia } from "@pinia/testing";
import { useBooks } from "../../stores/useBooks";

describe("ReaderMenu", () => {
    let wrapper;
    const bookId = '1';
    let pageNumber = '1';
    let bookStored;
    let mockRoute = {
        params: {
            bookId: bookId,
            pageNumber: pageNumber
        }
    };
    let mockRouter = {
        push: vi.fn()
    };

    beforeEach(() => {
        wrapper = mount(ReaderMenu, {
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })

        const store = useBooks();
        bookStored = store.books.find(book => book.id == bookId);
    })

    it("displays a list of chapter buttons with the correct number of buttons", () => {
        let displayedChapters = wrapper.findAll('button');
        expect(displayedChapters.length).toEqual(bookStored.chapters.length)
        // console.log(wrapper.find('.current').html())
    })

    it("won't display a current chapter (current page below first chapter)", () => {
        expect(wrapper.find('.current').exists()).toBe(false);
    })

    it("displays the current chapter if the page belongs to it", () => {
        mockRoute.params.pageNumber = '10';

        wrapper = mount(ReaderMenu, {
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })

        expect(wrapper.find('.current').exists()).toBe(true);
    })
})