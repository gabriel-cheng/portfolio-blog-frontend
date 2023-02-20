<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    const ferramentasUsadas = ref([]);
    const allPosts = ref<Array<iPostAttributes>>([]);
    const token = sessionStorage.getItem("token");
    let postId = "";

    interface iPostAttributes {
        _id: string,
        titulo: string,
        ferramentas: string,
        status: string,
        videoUrl: string,
        descricao: string,
        deploy: string,
        repositorio: string,
        postLinkedin: string
    }

    const ferramentasDisponiveis = [
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

    onMounted(() => {
        requestAllDatas();
    });

    async function requestAllDatas() {
        const nenhumaPostagem = (document.querySelector("#nenhumaPostagem") as HTMLDivElement);

        try {
            const response = await fetch("http://localhost:5000/posts", {
                method: "GET",
                headers: {
                    authorization: `bearer ${token}`
                }
            })
            .then(e => e.json())

            for(let i of response) {
                allPosts.value.push(i);
            }

            if(allPosts.value.length == 0) {
                nenhumaPostagem.classList.add("!block")
            } else nenhumaPostagem.classList.remove("!block")
        } catch(err) {
            console.log({request_all_datas_error: err});
        }
    }

    async function updatePost() {
        const titulo = (document.querySelector("#titulo") as HTMLInputElement).value;
        const video = (document.querySelector("#video") as HTMLInputElement).value;
        const linkedin = (document.querySelector("#linkedin") as HTMLInputElement).value;
        const deploy = (document.querySelector("#deploy") as HTMLInputElement).value;
        const repositorio = (document.querySelector("#repositorio") as HTMLInputElement).value;
        const status = (document.querySelector("#status") as HTMLSelectElement).value;
        const descricao = (document.querySelector("#descricao") as HTMLTextAreaElement).value;
        const form = (document.querySelector("#postForm") as HTMLFormElement);
        const post = allPosts.value.find(el => el._id == postId);
        const arr = [];
        const toolsUpdated: string[] = [];

        if (!post) {
            throw new Error("Post não encontrado");
        }

        for(const i of ferramentasDisponiveis) {
            arr.push(returnAllCheckboxes(i));
        }

        arr.filter(el => el.checked == true).forEach(el => toolsUpdated.push(el.value));

        try {
            await fetch(`http://localhost:5000/posts/update/${post._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`
                },
                body: JSON.stringify({
                    titulo: titulo,
                    ferramentas: toolsUpdated,
                    status: status,
                    videoUrl: video,
                    descricao: descricao,
                    deploy: deploy,
                    repositorio: repositorio,
                    postLinkedin: linkedin
                })
            })
            .then(e => e.json());

            form.reset();
        } catch(err) {
            console.log({update_post_err: err});
        }
    }

    function returnAllCheckboxes(postId: string) {
        return (document.querySelector(`#${postId}`) as HTMLInputElement);
    }

    function modalController(id: string) {
        postId = id;
        const post = allPosts.value.find(el => el._id == postId);

        if (!post) {
            throw new Error("Post não encontrado");
        }

        (document.querySelector("#titulo") as HTMLInputElement).value = post.titulo;
        (document.querySelector("#video") as HTMLInputElement).value = post.videoUrl;
        (document.querySelector("#linkedin") as HTMLInputElement).value = post.postLinkedin;
        (document.querySelector("#deploy") as HTMLInputElement).value = post.deploy;
        (document.querySelector("#repositorio") as HTMLInputElement).value = post.repositorio;
        (document.querySelector("#status") as HTMLSelectElement).value = post.status;
        (document.querySelector("#descricao") as HTMLTextAreaElement).value = post.descricao;

        openModal();
        setCheckedAttrb(id);

        return;
    }

    function setCheckedAttrb(id: string) {
        postId = id;
        const post = allPosts.value.find(el => el._id == postId);

        if(!post) {
            return "Postagem não encontrada!";
        }

        for(const ferramenta of post.ferramentas) {
            adicionarAtributoChecked(ferramenta);
        }

        function adicionarAtributoChecked(id: string) {
            return (document.querySelector(`#${id}`) as HTMLInputElement).checked = true;
        }

        return;
    }

    function openModal() {
        const modalOverlay = (document.querySelector("#modalOverlay") as HTMLDivElement);

        modalOverlay.classList.toggle("!top-0");
        modalOverlay.classList.toggle("!opacity-100");

        return;
    }

    function closeModal() {
        const form = (document.querySelector("#postForm") as HTMLFormElement);
        form.reset();
        openModal();

        return;
    }

    async function deletePost(id: string) {
        const confirmacao = confirm("Prosseguir com a exclusão da postagem?");

        if(confirmacao) {
            try {
                await fetch(`http://localhost:5000/posts/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${token}`
                    }
                })
                .then(e => e.json())

                location.reload();
            } catch(err) {
                console.log({delete_post_error: err});
            }
        }

        return;
    }
</script>

<template v-if="allPosts.length">
    <main class="pl-24 w-full max-w-2700 flex justify-center items-center h-screen bg-gradient-to-br from-purple-900 to-purple-400">
        <div class="bg-white w-11/12 h-5/6 overflow-y-auto rounded-md">
            <div class="flex items-center justify-between px-28 border-b-2 py-5">
                <h1 class="font-bold text-xl">Titulo</h1>
                <h1 class="font-bold text-xl">Descrição</h1>
                <h1 class="font-bold text-xl">Opções</h1>
            </div>
            <div id="nenhumaPostagem" class="w-full h-5/6 hidden relative opacity-25">
                <div class="h-full flex justify-center items-center">
                    <h1 class="text-4xl">Nenhum projeto por aqui...</h1>
                    <img class="w-28 mb-28" src="/sono.png" alt="zzz">
                </div>
            </div>
            <div v-for="(post, index) of allPosts.reverse()" :key="index" class="flex flex-wrap items-center justify-between px-6 py-7 border-b-2">
                <div class="w-full max-w-320px">
                    <h1 class="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis">{{ post.titulo }}</h1>
                </div>
                <div class="w-full max-w-lg">
                    <p class="whitespace-nowrap overflow-hidden text-ellipsis">{{ post.descricao }}</p>
                </div>
                <div class="flex flex-wrap gap-5">
                    <div class="relative bg-purple-800 hover:bg-purple-700 text-white active:bg-purple-900">
                        <div class="relative z-10 border-2">
                            <button @click="modalController(post._id);" class="bg-transparent px-7 pr-8 py-1 ">Editar</button>
                        </div>
                        <i class="pi z-2 pi-file-edit absolute top-2.5 right-2"></i>
                    </div>
                    <div class="relative bg-purple-800 hover:bg-purple-700 text-white active:bg-purple-900">
                        <div class="relative z-10 border-2">
                            <button @click="deletePost(post._id)" class="bg-transparent px-7 pr-9 py-1">Deletar</button>
                        </div>
                        <i class="pi z-2 pi-trash absolute top-2.5 right-2"></i>
                    </div>
                </div>
                <div id="modalOverlay" class="z-50 w-full h-screen opacity-0 bg-modalBackground absolute left-0 -top-full duration-500">
                    <div class="max-w-2700 w-full h-screen flex items-center justify-center">
                        <div class="flex items-center w-2/4 h-screen">
                            <form @submit.prevent="updatePost();" class="relative w-full max-w-3xl flex flex-col border-2 border-black p-10 rounded-xl bg-white" enctype="multipart/form-data" id="postForm">
                                <div @click="closeModal();" class="flex justify-center items-center w-10  h-10 absolute -top-4 -right-4 bg-purple-800 hover:bg-purple-700 active:bg-purple-900 cursor-pointer rounded-full">
                                    <i class="pi pi-times text-white"></i>
                                </div>
                                <div class="inputContainer">
                                    <input class="input w-full font-semibold text-xl normal-case" type="text" name="titulo" id="titulo" placeholder="Informe o título da postagem">
                                </div>
                                <div class="inputContainer">
                                    <input class="input" type="text" name="video" id="video" placeholder="Informe a URL do video de exemplo">
                                    <div class="w-full">
                                        <input type="file" class="w-full pb-1 mb-4 border-b-2 border-black cursor-pointer" id="file">
                                    </div>
                                </div>
                                <div class="inputContainer">
                                    <input class="input" type="text" name="linkedin" id="linkedin" placeholder="Informe o link da postagem no Linkedin">
                                    <input class="input" type="text" name="deploy" id="deploy" placeholder="Informe o link de deploy">
                                </div>
                                <div class="inputContainer">
                                    <input class="input" type="text" name="repositorio" id="repositorio" placeholder="Informe o link do repositório">
                                    <div class="flex w-full justify-between">
                                        <label for="">Status</label>
                                        <select name="status" id="status" class="border-b-2 h-8 px-4 cursor-pointer bg-transparent outline-none">
                                            <option selected>-</option>
                                            <option value="Concluido">Concluído</option>
                                            <option value="Em andamento">Em andamento</option>
                                        </select>
                                    </div>
                                </div>
                                <h1 class="text-3xl">Ferramentas</h1>
                                <div class="flex justify-cente">
                                    <div class="flex flex-wrap flex-col w-full h-28">
                                        <div id="ferramentasContainer" v-for="(ferramenta, index) in ferramentasDisponiveis" :key="index" class="mr-10">
                                            <input class="checkbox mr-1 cursor-pointer" type="checkbox" :name="ferramenta" :id="ferramenta" :value="ferramenta">
                                            <label :for="ferramenta">{{ ferramenta }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="inputContainer">
                                    <textarea class="resize-none w-full h-32 block mt-3 bg-transparent border-2 p-2 placeholder:text-black outline-none" name="descricao" id="descricao" placeholder="Informe o conteúdo"></textarea>
                                </div>
                                <div class="flex justify-center mt-5 relative">
                                    <button class="bg-blue-600 text-white tex w-2/3 h-14 uppercase font-semibold hover:bg-blue-800">Atualizar postagem</button>
                                    <!-- <i class="pi pi-plus-circle text-white absolute left-64 top-5"></i> -->
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
