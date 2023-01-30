<script setup lang="ts">
    async function authUser() {
        const username = (document.querySelector("#login") as HTMLInputElement).value;
        const password = (document.querySelector("#senha") as HTMLInputElement).value;
        const positiveStyles = [
            "bg-popupGreenBackground", "border-popupGreenBorder", "bg-popupGreenBorder",
            "pi-check", "text-popupGreenBorder", "Sucesso", "Autenticação realizada com sucesso!"
        ];
        const negativeStyles = [
            "bg-popupRedBackground", "border-popupRedBorder", "bg-popupRedBorder",
            "pi-times", "text-popupRedBorder", "Erro", "Login e/ou senha estão incorretos!"
        ];

        try {
            const url = "http://localhost:5000/users/auth/login"
            const request = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const data = await request.json();
            const token = await data.token;

            if(request.status == 200) {
                sessionStorage.setItem("token", token);

                setPopupStyle(negativeStyles, positiveStyles);
            } else setPopupStyle(positiveStyles, negativeStyles);

            showPopup();
        } catch(err) {
            console.log({login_server_error: err});
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
    <main class="w-full h-screen bg-gradient-to-br from-purple-900 to-purple-400 flex justify-center items-center">
        <div class="p-1 w-500px m-2 max-w-2700 bg-white shadow-default">
            <div class="border-2 border-purple-500 p-11 rounded-md">
                <div class="w-full mb-10 flex justify-center">
                    <h1 class="text-3xl font-extrabold font-mono uppercase text-purple-900">conectar-se</h1>
                </div>
                <form @submit.prevent="authUser();">
                    <div class="relative mb-10">
                        <input class="w-full outline-0 pl-9 border-b-2 border-gray-300 placeholder:text-loginTxtColor" type="text" name="login" id="login" placeholder="Informe seu login" required>
                        <i class="pi absolute left-3 bottom-1.5 text-loginTxtColor pi-user"></i>
                    </div>
                    <div class="relative mb-10">
                        <input class="w-full outline-0 pl-9 border-b-2 border-gray-300 placeholder:text-loginTxtColor" type="password" name="senha" id="senha" placeholder="Informe sua senha" required>
                        <i class="pi absolute left-3 bottom-1.5 text-loginTxtColor pi-lock"></i>
                    </div>
                    <div class="w-full flex justify-center relative ">
                        <input class="bg-purple-600 w-2/3 h-14 text-white uppercase cursor-pointer hover:bg-purple-800" type="submit" value="Conectar-se">
                        <i class="pi pi-sign-in absolute top-5 left-32 text-white text-xs"></i>
                    </div>
                </form>
            </div>
        </div>
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
