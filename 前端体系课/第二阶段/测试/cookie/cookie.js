// 添加cookie
const set = (
    name,
    value,
    { domain, maxAge, path, secure } = {}
) => {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (domain) {
        cookieText += `; domain=${domain}`
    }

    if (typeof maxAge === "number") {
        cookieText += `; maxAge=${maxAge}`
    }

    if (path) {
        cookieText += `; path=${path}`
    }
    if (secure) {
        cookieText += `; secure`
    }

    document.cookie = cookieText
}

// 通过name获取value
const get = name => {
    name = encodeURIComponent(name);
    const cookies = document.cookie.split('; ');

    for (const item of cookies) {
        const [cookieName, cookieValue] = item.split('=');

        if (name === cookieName)
            return decodeURIComponent(cookieValue);
    }

    return;
}

// 删除cookie
const remove = (
    name,
    { domain, path } = {}
) => {
    set(name, '', { domain, path, maxAge: -1 });
}
export { set, get, remove };