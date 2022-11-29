<script>
export default {
    props: {
        orderlist: {type: Array, default: () => []},
        activeIndex: {type: Number, default: -1},
    },
    emits: ['update:activeIndex'],
    methods: {
        updateActiveIndex(index){
            this.$emit('update:activeIndex', index);
        },
    },
};
</script>

<template>
    <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(order, index) in orderlist"
            :key="order.id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ order.fullname }}
        </li>
    </ul>
</template>