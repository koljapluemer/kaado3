<template>
    <div class="tag-input">
        <ul class="tags mt2 mb2">
            <code v-for="tag in tags" :key="tag" class="tag">
                {{ tag }}
                <button class="delete" @click="removeTag(tag)">x</button>
            </code>
        </ul>
        <input v-model="newTag" type="text" placeholder="Add new tag and press Tab" @keydown.prevent.tab="addTag(newTag)" />
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: {
        modelValue: { type: Array, default: () => [] },
    },
    setup(props, { emit }) {
        const tags = ref(props.modelValue);

        // const tags = ref(['what', 'up']);
        const newTag = ref('') //keep up with new tag

        const addTag = (tag) => {
            tags.value.push(tag); // add the new tag to the tags array
            console.log(tags.value);
            newTag.value = ""; // reset newTag
        };

        const removeTag = (tagName) => {
            // find tag by string matching the value
            tags.value = tags.value.filter((tag) => tag !== tagName);
        };

        const onTagsChange = () => {
            emit("update:modelValue", tags.value)
        }

        return { tags, newTag, addTag, removeTag };
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 0;
    padding: 0;
}

/* .tag {
    background: rgb(250, 104, 104);
    padding: 5px;
    border-radius: 4px;
    color: white;
    white-space: nowrap;
    transition: 0.1s ease background;
} */

.tags {
    margin: 8px 0;
}

input {
    width: 100%;
    padding: 10px;
}

.delete {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    min-height: unset;
    margin-bottom: none;
}

.delete {
    margin: 0 ;
    padding: 0 
}
</style>