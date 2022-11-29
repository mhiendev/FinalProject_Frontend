<template>
    <Form
        @submit="submitProduct"
        :validation-schema="productFormSchema"
    >
        <div class="form-group">
            <label for="prod_name">Tên sản phẩm</label>
            <Field
                name="prod_name"
                type="text"
                class="form-control"
                v-model="productLocal.prod_name"
            />
            <ErrorMessage name="prod_name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <Field
                name="quantity"
                type="int"
                class="form-control"
                v-model="productLocal.quantity"
            />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="unit_price">Đơn giá</label>
            <Field
                name="unit_price"
                type="float"
                class="form-control"
                v-model="productLocal.unit_price"
            />
            <ErrorMessage name="unit_price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="prod_detail">Chi tiết sản phẩm</label>
            <Field
                name="prod_detail"
                type="text"
                class="form-control"
                v-model="productLocal.prod_detail"
            />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
        </div>
    </Form>
</template>

<script>
    import * as yup from 'yup';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ['submit:product', 'delete:product'],
        props: {
            product: { type: Object, required: true }
        },
        data() {
            const productFormSchema = yup.object().shape({
                prod_name: yup
                    .string()
                    .required('Tên phải có giá trị.')
                    .min(2, 'Tên phải ít nhất 2 ký tự.')
                    .max(50, 'Tên có nhiều nhất 255 ký tự.'),
                quantity: yup
                    .number()
                    .required('Số lượng sản phẩm phải là số nguyên')
                    .positive(),
                unit_price: yup
                    .number()
                    .positive()
            });
            return {
                // Props are supposed to be immutable, therefore create
                // a local variable contactLocal and bind it to the form
                productLocal: { ...this.product, vip_mbrshp: !!this.product.vip_mbrshp},
                productFormSchema,
            };
        },
        methods: {
            submitProduct() {
                this.$emit('submit:product', this.productLocal);
            },
            deleteProduct() {
                this.$emit('delete:product', this.productLocal.id);
            },
        },
    };
</script>

<style scoped>
    @import '@/assets/form.css';
</style>