import { mount } from "@vue/test-utils";
import Content from "../layout/Content.vue";

describe("Content", () => {
    it("renders a content component", () => {
        const wrapper = mount(Content, {
            global: {
                stubs: {
                    routerView: true
                }
            }
        });
        expect(wrapper.get('#content').exists()).toBe(true);
    })
})