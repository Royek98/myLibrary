import { shallowMount } from "@vue/test-utils";
import { describe, expect } from "vitest";
import NavigationComponent from "../layout/NavigationComponent.vue";
import { createTestingPinia } from "@pinia/testing";
import HomeMenu from "../layout/HomeMenu.vue";
import ReaderMenu from "../layout/ReaderMenu.vue";

describe("NavigationComponent", () => {
    it("redners home menu", () => {
        const mockRoute = "/";
        const mockRouter = {
            push: vi.fn()
        };

        const wrapper = shallowMount(NavigationComponent, {
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                },
            }
        });

        expect(wrapper.getComponent(HomeMenu).exists()).toBe(true);
        expect(wrapper.findComponent(ReaderMenu).exists()).toBe(false);
    })

    it("redners reader menu", () => {
        const mockRoute = {
            name: 'reader'
        };
        const mockRouter = {
            push: vi.fn()
        };

        const wrapper = shallowMount(NavigationComponent, {
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                },
            }
        });

        expect(wrapper.getComponent(ReaderMenu).exists()).toBe(true);
        expect(wrapper.findComponent(HomeMenu).exists()).toBe(false);
    })
})