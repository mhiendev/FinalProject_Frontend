<template>
    <div
        v-if="product"
        class="page"
    >
    <h4>Cập nhật thông tin sản phẩm</h4>
    <ProductForm
        :product="product"
        @submit:product="onUpdateProduct"
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
    props: {
        productId: { type: Number, required: true },
    },
    data() {
        return {
            product: null,
            message: '',
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await stationeryService.getProduct(id);
            } catch (error) {
                console.log(error);
                // Redirect to NotFound page and keep URL intact
                this.$router.push({
                    name: 'notfound',
                    params: {
                        pathMatch: this.$route.path.split('/').slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async onUpdateProduct(product) {
            try {
                await stationeryService.updatePrd(product.id, product);
                this.message = 'Sản phẩm được cập nhật thành công.';
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getProduct(this.productId);
        this.message = '';
    },
};
</script>