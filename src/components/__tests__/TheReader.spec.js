import { shallowMount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import TheReader from "../TheReader.vue";
import { createTestingPinia } from "@pinia/testing";
import VuePdfEmbed from "vue-pdf-embed";

describe("TheReader", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(TheReader, {
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $route: {
                        params: {
                            bookId: '1'
                        }
                    }
                }
            },
        })
        // vi.mock('vue-pdf-embed', () => ({
        //     render: '<mock-vue-pdf-embed/>'
        // }));

        vi.mock('vue-pdf-embed', () => ({
            default: () => {
                return '<mock-vue-pdf-embed/>'
            },
        }))
    })

    it("renders a pdf reader", () => {
        expect(wrapper.getComponent(VuePdfEmbed).exists()).toBe(true);
    })

    it("redners a bottom control panel", () => {
        expect(wrapper.get('.readerMenu').exists()).toBe(true);
        expect(wrapper.findAll('.option').length).toEqual(4);
    })

    it("renders alert 'page saved' when bookmark is clicked", async () => {
        const constrolPanel = wrapper.findAll('.option');
        for(var index in constrolPanel) {
            if(constrolPanel[index].html().includes('fa-bookmark')) {
               constrolPanel[index].trigger('click');
            }
        }

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('span')[4].exists()).toBe(true);
        expect(wrapper.findAll('span')[4].text()).toEqual("Page saved!");
    })
})