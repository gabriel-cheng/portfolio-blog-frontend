<script lang="ts" setup>
    import { onMounted } from "vue";

    onMounted(toggleHeader);

    function toggleHeader() {
        const header = (document.querySelector('header') as HTMLHeadElement);
        const url = window.location.href.split("/");
        const li = header.querySelectorAll('li');

        for(let i = 0; i < li.length; i++) {
            li[i].onclick = () => {
                if(i == 0) {
                    li[1].classList.remove("bg-purple-900");
                    li[0].classList.add("bg-purple-900");
                } else if(i == 1) {
                    li[0].classList.remove("bg-purple-900");
                    li[1].classList.add("bg-purple-900");
                }
            }
            switch (url[3]) {
                case 'ver-postagens':
                    li[0].classList.add("bg-purple-900");
                    break;
                case 'criar-postagem':
                    li[1].classList.add("bg-purple-900");
                    break;
                default:
                    break;
            }
        }
    }
</script>

<template>
<header class="z-50 absolute left-0 bg-background flex justify-center h-full w-24 shadow-default hover:w-60 ease-in-out duration-300">
    <div class="flex flex-col w-full ease-in-out duration-300">
        <div class="p-4 relative after:content[''] after:absolute after:w-full after:h-px after:bg-afterBackground after:left-0 after:bottom-0">
            <img class="w-full max-w-247" src="/portfolio-icon-branco.png" alt="ícone citybens">
        </div>
        <nav class="">
            <ul class="p-1 text-white">
                <li class="mb-2 flex items-center hover:bg-lightGrey">
                    <i class="text-lg pi pi-save absolute left-9 cursor-pointer"></i>
                    <router-link class="navigation" to="/ver-postagens">
                        Ver postagens
                    </router-link>
                </li>
                <li class="flex items-center hover:bg-lightGrey">
                    <i class="text-lg pi pi-plus-circle absolute left-9 cursor-pointer"></i>
                    <router-link class="navigation" to="/criar-postagem">
                        Criar postagem
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</header>
</template>
