import BookList from "../BooksList.vue";
import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import BookItem from "../BookItem.vue";
import { useBooks } from "../../stores/useBooks";
import { expect } from "vitest";

describe("BookList", () => {
    it("redners a list of books from pinia store", () => {
        const wrapper = shallowMount(BookList, {
            global: {
                plugins: [createTestingPinia()]
            }
        });
        
        const store = useBooks();
        expect(wrapper.findAllComponents(BookItem).length).toEqual(store.books.length);
    })
})