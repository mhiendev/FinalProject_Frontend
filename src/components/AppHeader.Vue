<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a
            href="/"
            class="navbar-brand"
        >Website bán văn phòng phẩm</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link
                    :to="{ name: 'stationeryshop'}"
                    class="nav-link"
                >
                    Danh bạ
                    <i class="fas fa-address-book" />
                </router-link>
            </li>
        </div>
    </nav>
</template>