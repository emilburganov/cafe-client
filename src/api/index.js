/**
 * @param route
 * @param body
 * @param method
 * @returns {Promise<*|boolean>}
 */
export const $fetch = async (route, body = null, method = "get") => {
    const BASE_URL = "http://cafe-server/api-cafe";
    const url = new URL(BASE_URL + route);

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }

    if (["get", "delete"].includes(method)) {
        url.search = new URLSearchParams(body ?? {});
    }

    if (method === "patch") {
        body.append("_method", 'PATCH');
        method = "post";
    }

    const response = await fetch(url, {
        method,
        headers,
        body,
    });

    return handleResponse(response);
}

const handleResponse = async (r) => {
    if (r.status >= 200 && r.status < 300) {
        return await r.json();
    }

    if (r.status >= 400 && r.status < 500) {
        const response = await r.json();
        showNotification(response);
        return false;
    }

    if (r.status >= 500) {
        alert("Ошибка сервера");
    }

    return false;
}

export const showNotification = (response) => {
    let message = "";

    if (response.error.errors) {
        message = Object.values(response.error.errors).join("<br/> <br/>");
    }

    else if (response?.error?.message) {
        message = response.error.message
    }

    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerHTML = message;
    notification.id = String(Math.random() * Date.now());

    document.body.insertAdjacentHTML("beforeend", notification.outerHTML)

    setTimeout(() => {
        document.getElementById(notification.id).remove();
    }, 3000)
}
