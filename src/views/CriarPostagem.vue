<script lang="ts" setup>
    import { ref } from "vue";
    const positiveStyles = [
        "bg-popupGreenBackground", "border-popupGreenBorder", "bg-popupGreenBorder",
        "pi-check", "text-popupGreenBorder", "Sucesso", "Postagem criada com sucesso!"
    ];
    const negativeStyles = [
        "bg-popupRedBackground", "border-popupRedBorder", "bg-popupRedBorder",
        "pi-times", "text-popupRedBorder", "Erro", "Erro: a postagem não foi criada."
    ];

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

    async function sendPostToDatabase() {
        const titulo = (document.querySelector("#titulo") as HTMLInputElement).value;
        const video = (document.querySelector("#video") as HTMLInputElement).value;
        const linkedin = (document.querySelector("#linkedin") as HTMLInputElement).value;
        const deploy = (document.querySelector("#deploy") as HTMLInputElement).value;
        const repositorio = (document.querySelector("#repositorio") as HTMLInputElement).value;
        const status = (document.querySelector("#status") as HTMLSelectElement).value;
        const descricao = (document.querySelector("#descricao") as HTMLTextAreaElement).value;
        const form = (document.querySelector("#postForm") as HTMLFormElement);
        const token = sessionStorage.getItem("token");

        try {
            const request = await fetch('http://localhost:5000/posts/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                },
                body: JSON.stringify({
                    titulo: titulo,
                    ferramentas: ferramentasUsadas.value,
                    status: status,
                    videoUrl: video,
                    descricao: descricao,
                    deploy: deploy,
                    repositorio: repositorio,
                    postLinkedin: linkedin
                })
            });

            if(request.status == 201) {
                setPopupStyle(negativeStyles, positiveStyles);
            } else setPopupStyle(positiveStyles, negativeStyles);

            showPopup();
            await sendPictureToDatabase();
            form.reset();
        } catch(err) {
            console.log({create_new_post_error: err});
        }
    }

    async function sendPictureToDatabase() {
        const token = sessionStorage.getItem("token");
        const file = (document.querySelector("#file") as HTMLInputElement).files;
        const formData = new FormData();

        formData.append("name", file[0].name);
        formData.append("file", file[0]);

        try {
            await fetch('http://localhost:5000/pictures/save', {
                method: 'POST',
                headers: {
                    "authorization": `bearer ${token}`
                },
                body: formData
            })
        } catch(err) {
            console.log({save_picture_error: err});
        }
    }

    function setPopupStyle(removeStyles: string[], attrb: string[]) {
        const popupBackground = (document.querySelector("#popupBackground") as HTMLDivElement);
        const popupIconBackground = popupBackground.querySelector("#popupIconBackground");
        const messageTextColor = (popupBackground.querySelector("#messageTextColor") as HTMLDivElement);
        const statusMessage = (popupBackground.querySelector("#statusMessage") as HTMLParagraphElement);
        const statusMessageDescription = (popupBackground.querySelector("#statusMessageDescription") as HTMLParagraphElement);

        removeAllStyles(removeStyles);

        popupBackground.classList.add(attrb[0], attrb[1]);
        popupIconBackground?.classList.add(attrb[2], attrb[3]);
        messageTextColor.classList.add(attrb[4]);
        statusMessage.textContent = attrb[5];
        statusMessageDescription.textContent = attrb[6];

        return;
    }

    function removeAllStyles(attrb: string[]) {
        const popupBackground = (document.querySelector("#popupBackground") as HTMLDivElement);
        const popupIconBackground = popupBackground.querySelector("#popupIconBackground");
        const messageTextColor = (popupBackground.querySelector("#messageTextColor") as HTMLDivElement);

        popupBackground.classList.remove(attrb[0], attrb[1]);
        popupIconBackground?.classList.remove(attrb[2], attrb[3]);
        messageTextColor.classList.remove(attrb[4]);
    }

    function showPopup() {
        const popupContainer = (document.querySelector("#popupBackground") as HTMLDivElement);

        popupContainer.classList.remove("opacity-0", "top-0");
        popupContainer.classList.add("opacity-full", "top-10");

        setTimeout(closePopup, 7000);

        return;
    }

    function closePopup() {
        const popupContainer = (document.querySelector("#popupBackground") as HTMLDivElement);

        popupContainer.classList.remove("opacity-full", "top-10");
        popupContainer.classList.add("opacity-0", "top-0");

        return;
    }
</script>

<template>
    <main class="w-full max-w-2700 flex justify-center items-center h-screen bg-gradient-to-br from-purple-900 to-purple-400">
        <form @submit.prevent="sendPostToDatabase();" class="w-full max-w-3xl flex flex-col border-2 border-black p-10 rounded-xl" enctype="multipart/form-data" id="postForm">
            <div class="inputContainer">
                <input required class="input w-full font-semibold text-xl normal-case" type="text" name="titulo" id="titulo" placeholder="Informe o título da postagem">
            </div>
            <div class="inputContainer">
                <input required class="input" type="text" name="video" id="video" placeholder="Informe a URL do video de exemplo">
                <div class="w-full">
                    <input required type="file" class="w-full pb-1 mb-4 border-b-2 border-black cursor-pointer" id="file">
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
                        <option value="Concluido">Concluído</option>
                        <option value="Em andamento">Em andamento</option>
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
            <div class="flex justify-center mt-5 relative">
                <button class="bg-blue-600 text-white tex w-2/3 h-14 uppercase font-semibold hover:bg-blue-800">Criar postagem</button>
                <i class="pi pi-plus-circle text-white absolute left-64 top-5"></i>
            </div>
        </form>
        <div id="popupBackground" class="w-500px h-20 border-b-4 rounded-md absolute top-0 opacity-0 duration-300">
            <div id="messageTextColor" class="relative w-full h-full rounded-md">
                <div class="flex items-center h-full">
                    <i id="popupIconBackground" class="p-2 rounded-full mx-3 text-white pi pi-check font-extrabold"></i>
                    <div class="">
                        <p id="statusMessage" class="font-extrabold text-lg"></p>
                        <p id="statusMessageDescription" class="font-normal"></p>
                    </div>
                </div>
                <span @click="closePopup();" class="cursor-pointer font-bold absolute right-2 top-0 text-gray-700">X</span>
            </div>
        </div>
    </main>
</template>
