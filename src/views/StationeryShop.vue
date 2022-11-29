<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Khách hàng:
                <i class="fas fa-thin fa-cart-shopping" />
            </h4>
            <OrderList
                v-if="filteredOrdersCount > 0"
                :orderlist="filteredOrders"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>
                Không có đơn hàng nào.
            </p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button
                    class="btn btn-sm btn-primary"
                    @click="refreshList()"
                >
                    <i class="fas fa-redo" /> Làm mới
                </button>

                <button
                    class="btn btn-sm btn-success"
                    @click="goToAddOrder()"
                >
                    <i class="fas fa-plus" /> Thêm mới
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    @click="onDeleteOrder(activeOrder.id)"
                >
                    <i class="fas fa-trash" /> Xóa
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeOrder">
                <h4>
                    Chi tiết đơn hàng
                    <i class="fas fa-address-card" />
                </h4>
                <OrderCard :order="activeOrder" />
                <router-link
                    :to="{
                        name:  'product.edit',
                        params: { id: activeOrder.product_id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit" /> Chỉnh sửa</span>
                </router-link>
            </div>
        </div> 
    </div>
</template>

<script>
import OrderCard from "@/components/OrderCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import OrderList from "@/components/OrderList.vue";
import { stationeryService } from '@/services/stationery.service';
export default {
    components: {
        OrderCard,
        InputSearch,
        OrderList,
    },
    //The full code will be presented below
    data() {
        return {
            orderlist: [],
            activeIndex: -1,
            searchText: '',
        };
    },
    watch: {
        // Monitor changes on searchText
        // Release the currently selected contact
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Map cutomers to strings for searching.
        ordersAsStrings() {
            return this.orderlist.map((order) => {
                const { fullname, address, phone, vip_mbrshp } = order;
                return [fullname, address, phone, vip_mbrshp].join('');
            });
        },
        // Return customers filtered by the search box.
        filteredOrders() {
                if (!this.searchText) return this.orderlist;
                return this.orderlist.filter((order, index) =>
                this.ordersAsStrings[index].includes(this.searchText)
            );
        },
        activeOrder() {
            if (this.activeIndex < 0) return null;
                return this.filteredOrders[this.activeIndex];
            },
        filteredOrdersCount() {
            return this.filteredOrders.length;
        },
    },
    methods: {
        async retrieveOrders() {
            try {
                const ordersList = await stationeryService.getManyOrd();
                this.orderlist = ordersList.sort((current, next) =>
                current.fullname.localeCompare(next.fullname)
            );
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveOrders();
            this.activeIndex = -1;
        },
        async onDeleteOrder(id) {
            if (confirm('Bạn muốn xóa đơn hàng này')) {
                try {
                    await stationeryService.delete(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddOrder() {
            this.$router.push({ name: 'product.add' });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>