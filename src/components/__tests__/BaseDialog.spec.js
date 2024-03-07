import BaseDialog from "../layout/BaseDialog.vue";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'
import { useBooks } from '../../stores/useBooks.js';

describe("BaseDialog", () => {
    const mockRouter = {
        push: vi.fn(),
    };
    
    let wrapper;
        beforeEach( async () => {
            wrapper = mount(BaseDialog, {
                props: {
                    show: true
                },
                slots: {
                    poster: "<p id='poster'>Poster</p>",
                    genres: "<p id='genres'>Fantasy</p>",
                    title: "<p id='title'>Title</p>",
                    author: "<p id='author'>Author</p>",
                    read: "<p id='read'>Read</p>",
                    description: "<p id='description'>Description</p>",
                    chapters: "<p id='chapters'>Chapter 1</p>"
                },
                global: {
                    plugins: [createTestingPinia()],
                    stubs: {
                        teleport: true,
                        routerLink: RouterLinkStub
                    }
                },
                mocks: {
                    $router: mockRouter
                },
            })

            await wrapper.vm.$nextTick();
        })

    describe("default mode", () => {
        it("renders a component", () => {
            expect(wrapper.get("#poster").text()).toEqual("Poster")
            expect(wrapper.get("#genres").text()).toEqual("Fantasy")
            expect(wrapper.get("#title").text()).toEqual("Title")
            expect(wrapper.get("#author").text()).toEqual("Author")
            expect(wrapper.get("#read").text()).toEqual("Read")
            expect(wrapper.get("#description").text()).toEqual("Description")
            expect(wrapper.get("#chapters").text()).toEqual("Chapter 1")
        })

        it("component has an exit button", () => {
            expect(wrapper.find("button").exists()).toBe(true)
        })
    })

    describe("editing mode", () => {
        it("renders a component", () => {
            expect(wrapper.get("#poster").text()).toEqual("Poster")
            expect(wrapper.get("#genres").text()).toEqual("Fantasy")
            expect(wrapper.get("#title").text()).toEqual("Title")
            expect(wrapper.get("#author").text()).toEqual("Author")
            expect(wrapper.get("#read").text()).toEqual("Read")
            expect(wrapper.get("#description").text()).toEqual("Description")
            expect(wrapper.get("#chapters").text()).toEqual("Chapter 1")
        })

        it("component doesn't have an exit button", async () => {
            const store = useBooks()
            store.editing = true;
            await wrapper.vm.$nextTick();
            expect(wrapper.find("button").exists()).toBe(false)
        })
    })
})