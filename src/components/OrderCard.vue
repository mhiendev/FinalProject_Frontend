
<script>
import moment from 'moment'
export default {
    data(){
        return {
            moment:moment, 
        }
    },
    props: {
        order: {type: Object, required: true},
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên khách hàng:</strong>
            {{ order.fullname }}
        </div>
        <div class="p-1">
            <strong>Tên sản phẩm:</strong>
            {{ order.prod_name }}
        </div>
        <div class="p-1">
            <strong>Đơn giá:</strong>
            {{ order.unit_price }}
        </div>
        <div class="p-1">
            <strong>Tổng:</strong>
            {{ order.total }}
        </div>
        <div class="p-1">
            <strong>Ngày thanh toán:</strong>
            {{ moment(order.purchased_day).format('DD/MM/YYYY hh:mm') }}
        </div>
        <div class="p-1">
            <strong>Thành viên VIP:&nbsp;</strong>
            <i 
                v-if="order.vip_mbrshp"
                class="fas fa-check"
            />
            <i 
                v-else
                class="fas fa-times"
            />
        </div>
    </div>
</template>