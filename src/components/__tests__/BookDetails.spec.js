import { beforeEach, describe, expect, vi } from "vitest"
import BookDetails from "../BookDetails.vue"
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'
import BaseDialog from "../layout/BaseDialog.vue";
import BaseChapters from "../layout/BaseChapters.vue"

describe("BookDetails", () => {
    let wrapper;
    let baseDialog;
    const mockRoute = {
        params: {
            bookId: '1',
        },
    };

    const mockRouter = {
        push: vi.fn(),
    };
    vi.mock('vue-router', () => mockRouter);

    beforeEach(async () => {
        wrapper = mount(BookDetails, {
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                },
                stubs: {
                    teleport: true,
                    routerLink: RouterLinkStub 
                }
            },  
        })
        await wrapper.vm.$nextTick(); // wait for teleport
        baseDialog = wrapper.getComponent(BaseDialog).get('dialog');
    })
    it("dialog window pops up", () => { 
        expect(baseDialog.exists()).toBe(true);
    })

    it("book details are correct", () => { 
        const book = wrapper.vm.book;
        expect(book.id).toEqual(1);
        expect(baseDialog.html()).toContain(book.title)
        expect(baseDialog.html()).toContain(book.author)
        expect(baseDialog.html()).toContain(book.description)
        expect(baseDialog.html()).toContain(book.poster)
        expect(baseDialog.html()).toContain(book.releaseDate)

        const chapters = baseDialog.findAllComponents(BaseChapters)
        expect(chapters[0].html()).toContain(book.chapters[0].name)
        expect(chapters[1].html()).toContain(book.chapters[1].name)
        expect(chapters[2].html()).toContain(book.chapters[2].name)
    })
})