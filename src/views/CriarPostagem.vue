<script lang="ts" setup>
    import { ref, resolveDirective } from "vue";

    const arr: string[] = [];
    const ferramentasUsadas = ref(arr);

    const ferramentas = [
        "html",
        "css",
        "javascript",
        "bootstrap",
        "java",
        "mongodb",
        "mysql",
        "nodejs",
        "postgres",
        "python",
        "reactjs",
        "sass",
        "sqlite",
        "tailwind",
        "typescript",
        "vuejs"
    ];

    function alerte() {
        alert("Selecionar!");
    }

    function sendPostToDatabase() {
    }
</script>

<template>
    <main class="w-full max-w-2700 flex justify-center items-center h-screen bg-gradient-to-br from-purple-900 to-purple-400">
        <form @submit.prevent="sendPostToDatabase();" class="w-full max-w-3xl flex flex-col border-2 border-black p-10 rounded-xl">
            <div class="inputContainer">
                <input required class="input w-full font-semibold text-xl normal-case" type="text" name="titulo" id="titulo" placeholder="Informe o título da postagem">
            </div>
            <div class="inputContainer">
                <input required class="input" type="text" name="video" id="video" placeholder="Informe a URL do video de exemplo">
                <div class="w-full relative">
                    <input required class="input" type="text" name="background" id="background" placeholder="Imagem de background">
                    <button @click="alerte" class="absolute right-0 -top-0.5 hover:bg-blue-800 bg-blue-600 text-white px-5 rounded-sm">Selecionar</button>
                </div>
            </div>
            <div class="inputContainer">
                <input required class="input" type="text" name="linkedin" id="linkedin" placeholder="Informe o link da postagem no Linkedin">
                <input required class="input" type="text" name="deploy" id="deploy" placeholder="Informe o link de deploy">
            </div>
            <div class="inputContainer">
                <input required class="input" type="text" name="repositorio" id="repositorio" placeholder="Informe o link do repositório">
                <div class="flex w-full justify-between">
                    <label for="">Status</label>
                    <select name="status" id="status" class="border-b-2 h-8 px-4 cursor-pointer bg-transparent outline-none">
                        <option value="concluido">Concluído</option>
                        <option value="andamento">Em andamento</option>
                    </select>
                </div>
            </div>
            <h1 class="text-3xl">Ferramentas</h1>
            <div class="flex justify-cente">
                <div class="flex flex-wrap flex-col w-full h-28">
                    <div v-for="(ferramenta, index) in ferramentas" :key="index" class="mr-10">
                        <input class="mr-1 cursor-pointer" type="checkbox" :name="ferramenta" :id="ferramenta" :value="ferramenta" v-model="ferramentasUsadas">
                        <label :for="ferramenta">{{ ferramenta }}</label>
                    </div>
                </div>
            </div>
            <div class="inputContaine">
                <textarea required class="resize-none w-full h-32 block mt-3 bg-transparent border-2 p-2 placeholder:text-black outline-none" name="descricao" id="descricao" placeholder="Informe o conteúdo"></textarea>
            </div>
            <div class="flex justify-center mt-5">
                <button class="bg-blue-600 text-white tex w-2/3 h-14 uppercase font-semibold hover:bg-blue-800">Criar postagem</button>
                <i class="pi pi-plus text-white border-2 border-white"></i>
            </div>
        </form>
    </main>
</template>
