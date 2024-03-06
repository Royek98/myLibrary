import { beforeEach, describe, expect, it } from "vitest";
import GenreCheckbox from "../layout/GenreCheckbox.vue";
import { shallowMount } from "@vue/test-utils";

describe("GenreCheckbox", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GenreCheckbox, {
            props: {
                label: 'Fantasy',
                value: false
            },
        });
    })
    it("renders component with props label: Fantasy, value: false", () => {
        expect(wrapper.get('span').text()).toBe('Fantasy');
        const checkbox = wrapper.get('input[type="checkbox"]');
        expect(checkbox.exists()).toBe(true);
        // Check if the checkbox is initially unchecked
        expect(checkbox.element.checked).toBe(false);
    })

    it("simulate a change event on the checkbox", async () => {
        const checkbox = wrapper.get('input[type="checkbox"]');
        expect(checkbox.exists()).toBe(true);
        expect(checkbox.element.checked).toBe(false);

        await checkbox.setChecked(true);
        expect(checkbox.element.checked).toBe(true);
    })

    it("check if the checkbox emits the expected value on change", async () => {
        const checkbox = wrapper.get('input[type="checkbox"]');
        expect(checkbox.exists()).toBe(true);

        await checkbox.setChecked(true);

        expect(wrapper.emitted().genreChecked).toBeTruthy();
        expect(wrapper.emitted().genreChecked[0]).toEqual([{ label: 'Fantasy', value: true }]);
    })
})