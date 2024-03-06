import { mount } from '@vue/test-utils';
import BaseChapters from '../layout/BaseChapters.vue';
import { expect } from 'vitest';

describe("BaseChapters", () => {
    it("renders chapter details: number, title and page ", () => {
        const title = "Title test"
        const num = "1"
        const page = "4"
        const wrapper = mount(BaseChapters, {
            slots: {
                num: num,
                default: title,
                page: page,
            },
        });
        const numSlot = wrapper.get(".chapterNum")
        expect(numSlot.exists()).toBe(true);
        expect(numSlot.text()).toEqual("Chapter " + num);

        const titleSlot = wrapper.get(".title");
        expect(titleSlot.exists()).toBe(true);
        expect(titleSlot.text()).toEqual(title);

        const pageSlot = wrapper.get(".right");
        expect(pageSlot.exists()).toBe(true);
        expect(pageSlot.text()).toEqual(page);
    })
})