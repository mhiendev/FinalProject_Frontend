<template>
    <div
        v-if="product"
        class="page"
    >
        <h4>Thêm sản phẩm mới</h4>
        <ProductForm
            :product="product"
            @submit:product="onAddProduct"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue';
import { stationeryService } from '@/services/stationery.service';
export default {
    components: {
        ProductForm,
    },
    
    data() {
        return {
            product: null,
            message: '',
        };
    },
    methods: {
        async onAddProduct(product) {
            try {
                await stationeryService.createPrd(product);
                this.message = 'Đơn hàng được thêm thành công.';
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.message = '';
        this.product = {prod_name: '', quantity: '', unit_price: '', prod_detail: '', };
    },
};
</script>