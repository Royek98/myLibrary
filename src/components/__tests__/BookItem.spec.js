import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BookItem from "../BookItem.vue";
import BookDetails from "../BookDetails.vue";
import BookEdit from "../BookEdit.vue";

describe("BookItem", () => {
    it("renders a book DETAILS dialog", () => {
        const mockRoute = {
            name: "details",
            params: {
                bookId: 1
            }
        };

        const wrapper = shallowMount(BookItem, {
            global: {
                mocks: {
                    $route: mockRoute
                },
                stubs: {
                    routerLink: true
                }
            }
        });
        expect(wrapper.getComponent(BookDetails).exists()).toBe(true);
        expect(wrapper.findComponent(BookEdit).exists()).toBe(false);
    });

    it("renders a book EDIT dialog", () => {
        const mockRoute = {
            name: "edit",
            params: {
                bookId: 1
            }
        };

        const wrapper = shallowMount(BookItem, {
            global: {
                mocks: {
                    $route: mockRoute
                },
                stubs: {
                    routerLink: true
                }
            }
        });
        expect(wrapper.getComponent(BookEdit).exists()).toBe(true);
        expect(wrapper.findComponent(BookDetails).exists()).toBe(false);
    });

    it("renders a router link", () => {
        const mockRoute = {
            name: "/",
            params: {
                bookId: 1
            }
        };

        const wrapper = shallowMount(BookItem, {
            global: {
                mocks: {
                    $route: mockRoute
                },
                stubs: {
                    routerLink: true
                }
            }
        });

        expect(wrapper.get('router-link-stub').exists()).toBe(true);
    })
})